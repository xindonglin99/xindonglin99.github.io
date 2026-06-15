# Cloudflare visitor counter

This Worker stores aggregate visit counts in Cloudflare D1 and returns the two
numbers shown in the website footer:

- `visits`: total recorded page loads
- `regions`: number of distinct first-level regions seen by Cloudflare

It does not store IP addresses, user agents, or per-visitor identifiers.

## Setup

1. Create a D1 database in Cloudflare.
2. Run `schema.sql` against that database.
3. Copy `wrangler.toml.example` to `wrangler.toml`.
4. Replace `database_id` in `wrangler.toml`.
5. Set `ALLOWED_ORIGINS` to your production URL, plus localhost while testing.
6. Deploy the Worker with Wrangler.
7. Add the deployed Worker URL as a GitHub repository variable named
   `VISITOR_COUNTER_ENDPOINT`.

Optional: if you also enable Cloudflare Web Analytics, add its site token as a
GitHub repository variable named `CLOUDFLARE_WEB_ANALYTICS_TOKEN`.
