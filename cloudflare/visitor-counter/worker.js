const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const corsHeaders = getCorsHeaders(origin, env.ALLOWED_ORIGINS);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    if (request.method !== "GET" && request.method !== "POST") {
      return jsonResponse(
        { error: "Method not allowed" },
        405,
        corsHeaders,
      );
    }

    if (request.method === "POST") {
      await recordVisit(request, env);
    }

    const stats = await getStats(env);

    return jsonResponse(stats, 200, corsHeaders);
  },
};

async function recordVisit(request, env) {
  const countryCode = cleanCode(request.cf?.country, "XX");
  const regionCode = cleanCode(request.cf?.regionCode, "UNKNOWN");
  const regionName = cleanText(request.cf?.region, regionCode);
  const regionKey = `${countryCode}:${regionCode}`;

  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO counters (name, value)
       VALUES ('visits', 1)
       ON CONFLICT(name) DO UPDATE SET value = value + 1`,
    ),
    env.DB.prepare(
      `INSERT INTO regions (
         region_key,
         country_code,
         region_code,
         region_name,
         visits,
         first_seen_at,
         last_seen_at
       )
       VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       ON CONFLICT(region_key) DO UPDATE SET
         visits = visits + 1,
         last_seen_at = CURRENT_TIMESTAMP`,
    ).bind(regionKey, countryCode, regionCode, regionName),
  ]);
}

async function getStats(env) {
  const [visitsRow, regionsRow] = await env.DB.batch([
    env.DB.prepare(
      "SELECT COALESCE(value, 0) AS value FROM counters WHERE name = 'visits'",
    ),
    env.DB.prepare("SELECT COUNT(*) AS value FROM regions"),
  ]);

  return {
    visits: visitsRow.results?.[0]?.value ?? 0,
    regions: regionsRow.results?.[0]?.value ?? 0,
  };
}

function getCorsHeaders(origin, allowedOrigins = "") {
  const allowed = allowedOrigins
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const allowOrigin =
    allowed.length === 0 || allowed.includes(origin) ? origin || "*" : allowed[0];

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function jsonResponse(body, status, corsHeaders) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...jsonHeaders,
      ...corsHeaders,
    },
  });
}

function cleanCode(value, fallback) {
  if (typeof value !== "string") {
    return fallback;
  }

  const cleaned = value.replace(/[^A-Za-z0-9_-]/g, "").slice(0, 32);
  return cleaned || fallback;
}

function cleanText(value, fallback) {
  if (typeof value !== "string") {
    return fallback;
  }

  const cleaned = value.trim().slice(0, 80);
  return cleaned || fallback;
}
