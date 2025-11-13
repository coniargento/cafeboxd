// src/services/serpapi.js
import { getApiKey } from '../config/serpapi.js';

const SERPAPI_BASE_URL = 'https://serpapi.com/search.json';

// Coordenadas del Obelisco (punto neutro para búsquedas en CABA)
const LL = '-34.6037,-58.3816';
const ZOOM = '13';

/**
 * 🔍 Búsqueda general de cafés (usa google_maps REAL)
 */
export async function searchCafes(query = 'cafe') {
  try {
    const params = new URLSearchParams({
      engine: 'google_maps_search',
      q: query,
      location: location,
      hl: SERPAPI_CONFIG.DEFAULT_LANGUAGE,
      gl: SERPAPI_CONFIG.DEFAULT_COUNTRY,
      google_domain: SERPAPI_CONFIG.DEFAULT_DOMAIN,
      api_key: getApiKey(),
    });
  
    const response = await fetch(`${SERPAPI_BASE_URL}?${params}`);

    if (!response.ok) {
      console.error('❌ Error API STATUS:', response.status);
      throw new Error(`API ${response.status}`);
    }

    const data = await response.json();
    return processCafeResults(data);
  } catch (error) {
    console.error('❌ Error buscando cafés:', error);
    return [];
  }
}

export async function searchCafesRaw(query) {
  const params = new URLSearchParams({
    engine: "google_maps",
    type: "search",
    q: query,
    hl: "es",
    gl: "ar",
    google_domain: "google.com.ar",
    api_key: getApiKey(),
  });

  const res = await fetch(`https://serpapi.com/search.json?${params}`);
  const json = await res.json();

  return json;
}


/**
 * 🧠 Normalizar resultados de SerpApi
 */
function processCafeResults(data) {
  const cafes = [];

  // ⚡ Formato REAL: data.local_results = array
  if (Array.isArray(data.local_results)) {
    data.local_results.forEach((p) => {
      cafes.push({
        name: p.title || 'Café',
        slug: generateSlug(p.title || 'cafe'),
        city: extractCity(p.address),
        rating: p.rating || 0,
        image: p.thumbnail || '/cafes/fallback.jpg',
        address: p.address || '',
        phone: p.phone || '',
        website: p.website || '',
        reviews: p.reviews || 0,
        price: p.price || '',
        type: p.type || 'Café'
      });
    });
  }

  return cafes;
}

/** Slug SEO */
function generateSlug(title) {
  return title
    ?.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

/** Extraer barrio */
function extractCity(address) {
  if (!address) return 'Buenos Aires';
  const barrios = [
    'Palermo','Recoleta','San Telmo','La Boca','Caballito',
    'Barracas','Villa Crespo','Almagro','Boedo','Flores',
    'Belgrano','Núñez','Puerto Madero','Monserrat','Retiro'
  ];

  for (const b of barrios) {
    if (address.toLowerCase().includes(b.toLowerCase())) return b;
  }
  return 'Buenos Aires';
}

/** Búsqueda por barrio */
export async function searchCafesByNeighborhood(neighborhood) {
  return await searchCafes(`cafe ${neighborhood}`);
}

/** Búsqueda por tipo */
export async function searchCafesByType(type) {
  return await searchCafes(`${type} cafe`);
}

/** Populares de la semana */
export async function getPopularCafesThisWeek() {
  const queries = [
    'mejor cafe buenos aires',
    'cafe recomendado buenos aires',
    'cafe popular buenos aires'
  ];

  const all = [];
  for (const q of queries) {
    const r = await searchCafes(q);
    all.push(...r);

    await new Promise(res => setTimeout(res, 200));
  }

  const unique = all.filter(
    (c, i, arr) => i === arr.findIndex((x) => x.name === c.name)
  );

  return unique
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 12);
}


