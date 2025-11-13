import { getApiKey } from '../../config/serpapi.js';

export async function searchCafes(query: string) {
  try {
    const apiKey = getApiKey();

    const url = `https://serpapi.com/search.json?engine=google_maps&type=search&q=${encodeURIComponent(
      query
    )}&hl=es&gl=ar&api_key=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    // LOG para DEBUG
    console.log("SERPAPI RAW DATA:", Object.keys(data));

    // TU JSON REAL TIENE ESTO:
    //   data.local_results = [...]
    const results = data.local_results ?? [];

    // Mapeo limpio
    return results.map((item: any) => ({
      id: item.place_id,
      title: item.title,
      rating: item.rating,
      reviews: item.reviews,
      address: item.address,
      phone: item.phone,
      website: item.website,
      thumbnail: item.thumbnail,
      description: item.description,
      position: item.position,
    }));

  } catch (err) {
    console.error("ERROR searchCafes:", err);
    return [];
  }
}
