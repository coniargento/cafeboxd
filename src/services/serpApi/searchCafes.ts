import { getApiKey } from '../../config/serpapi.js';

export async function searchCafesRaw(query: string) {
  try {
    const apiKey = getApiKey();

    const url = `https://serpapi.com/search.json?engine=google_maps&type=search&q=${encodeURIComponent(
      query
    )}&hl=es&gl=ar&api_key=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    console.log("🔥 SERPAPI KEYS:", Object.keys(data));

    return data;

  } catch (err) {
    console.error("❌ ERROR searchCafesRaw:", err);
    return null;
  }
}

export async function searchCafes(query: string) {
  const raw = await searchCafesRaw(query);

  if (!raw) return [];

  // ESTE ES EL BUENO — SIEMPRE EXISTE
  const list = raw.local_results || [];

  console.log("🔥 TOTAL CAFÉS:", list.length);

  return list.map((item: any) => ({
    id: item.place_id,
    slug: item.place_id,
    name: item.title,
    rating: item.rating || 0,
    reviews: item.reviews || 0,
    address: item.address,
    image: item.thumbnail || "/cafes/fallback.jpg"
  }));
}
