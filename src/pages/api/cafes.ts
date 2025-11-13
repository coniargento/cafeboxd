import type { APIRoute } from 'astro';

// `serpapi.js` ya está en tu repo (src/services/serpapi.js)
 // @ts-ignore – el servicio está en .js
import {
  searchCafes,
  searchCafesByType,
  searchCafesByNeighborhood,
  getPopularCafesThisWeek,
} from '../../services/serpapi.js';

export const GET: APIRoute = async ({ url }) => {
  const q = url.searchParams.get('q') ?? '';                             // texto libre (ej: "cafe de especialidad")
  const location = url.searchParams.get('location') ?? undefined;        // ej: "Buenos Aires, Argentina"
  const type = url.searchParams.get('type') ?? undefined;                // ej: "latte"
  const neighborhood = url.searchParams.get('neighborhood') ?? undefined;// ej: "Palermo"
  const limit = Math.max(1, Math.min(50, Number(url.searchParams.get('limit') ?? 12)));

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600',
  } as Record<string, string>;

  try {
    let items: any[] = [];

    if (neighborhood) {
      // Si pasás ?neighborhood=Palermo (puede usar searchCafesByNeighborhood)
      items = await (typeof searchCafesByNeighborhood === 'function'
        ? searchCafesByNeighborhood(neighborhood)
        : searchCafes(`cafe ${neighborhood}`, `${neighborhood}, ${location ?? 'Buenos Aires, Argentina'}`));
    } else if (type) {
      // Si pasás ?type=flat%20white
      items = await (typeof searchCafesByType === 'function'
        ? searchCafesByType(type)
        : searchCafes(`${type} cafe`, location));
    } else if (q || location) {
      // Búsqueda general por texto/ubicación
      items = await searchCafes(q || 'cafe de especialidad', location);
    } else {
      // Sin parámetros → Populares de la semana
      items = await getPopularCafesThisWeek();
    }

    const result = Array.isArray(items) ? items.slice(0, limit) : [];
    return new Response(JSON.stringify({ success: true, items: result }), { status: 200, headers });
  } catch (err: any) {
    console.error('api/cafes error:', err);
    return new Response(
      JSON.stringify({ success: false, error: err?.message ?? 'fetch_error', items: [] }),
      { status: 500, headers }
    );
  }
};
