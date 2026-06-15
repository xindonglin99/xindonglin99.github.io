"use client";

import { useEffect, useState } from "react";

type VisitorStats = {
  visits: number;
  regions: number;
};

const counterEndpoint = process.env.NEXT_PUBLIC_VISITOR_COUNTER_ENDPOINT;

const numberFormat = new Intl.NumberFormat("en");

export function VisitorCounter() {
  const [stats, setStats] = useState<VisitorStats | null>(null);

  useEffect(() => {
    if (!counterEndpoint) {
      return;
    }

    const controller = new AbortController();

    async function updateCounter() {
      try {
        const response = await fetch(counterEndpoint as string, {
          method: "POST",
          cache: "no-store",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: window.location.pathname,
          }),
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as Partial<VisitorStats>;

        if (
          typeof data.visits === "number" &&
          typeof data.regions === "number"
        ) {
          setStats({
            visits: data.visits,
            regions: data.regions,
          });
        }
      } catch {
        // Keep the footer quiet if the counter endpoint is unavailable.
      }
    }

    updateCounter();

    return () => controller.abort();
  }, []);

  if (!counterEndpoint || !stats) {
    return null;
  }

  return (
    <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-500">
      Visitors {numberFormat.format(stats.visits)} | Regions{" "}
      {numberFormat.format(stats.regions)}
    </p>
  );
}
