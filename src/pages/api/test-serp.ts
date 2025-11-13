import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const key = import.meta.env.SERPAPI_KEY;

  const url = `https://serpapi.com/search.json?engine=google_maps&type=search&q=cafe%20Buenos%20Aires&hl=es&gl=ar&api_key=${key}`;

  const r = await fetch(url);
  const json = await r.json();

  return new Response(JSON.stringify(json, null, 2), {
    headers: { "Content-Type": "application/json" }
  });
};
