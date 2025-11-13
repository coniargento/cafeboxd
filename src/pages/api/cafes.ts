import { searchCafes } from "../../services/serpApi/searchCafes";
import { normalizeSerpItem } from "../../lib/normalize-serp";

export async function get({ url }) {
  try {
    const q = url.searchParams.get("q") || "cafetería buenos aires";

    // 1) SerpApi (devuelve local_results)
    const rawItems = await searchCafes(q);

    // 2) Normalizar → (name, image, rating, slug, etc.)
    const cafes = rawItems.map(item => {
      const c = normalizeSerpItem(item);
      return {
        ...c,
        slug: (c.name || "cafe")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
      };
    });

    // 3) Ordenamos por rating
    const sorted = cafes
      .filter(c => c.rating)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10); // TOP 10

    return new Response(
      JSON.stringify({ success: true, items: sorted }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("API /cafes ERROR:", err);

    return new Response(
      JSON.stringify({ success: false, items: [] }),
      { status: 500 }
    );
  }
}

