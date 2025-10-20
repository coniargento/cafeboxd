// SerpApi service para buscar cafés
import { SERPAPI_CONFIG, getApiKey } from '../config/serpapi.js';

const SERPAPI_BASE_URL = 'https://serpapi.com/search.json';

// Función para buscar cafés usando SerpApi
export async function searchCafes(query = 'cafe de especialidad', location = SERPAPI_CONFIG.DEFAULT_LOCATION) {
  try {
    // Construir parámetros de la consulta
    const params = new URLSearchParams({
      q: query,
      location: location,
      hl: SERPAPI_CONFIG.DEFAULT_LANGUAGE,
      gl: SERPAPI_CONFIG.DEFAULT_COUNTRY,
      google_domain: SERPAPI_CONFIG.DEFAULT_DOMAIN,
      api_key: getApiKey()
    });

    const response = await fetch(`${SERPAPI_BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }

    const data = await response.json();
    
    // Procesar los resultados de Google Local
    return processCafeResults(data);
    
  } catch (error) {
    console.error('Error buscando cafés:', error);
    throw error;
  }
}

// Función para procesar los resultados de SerpApi y convertirlos al formato de Cafeboxd
function processCafeResults(data) {
  const cafes = [];
  
  // Extraer resultados de Google Local
  if (data.local_results && data.local_results.places) {
    data.local_results.places.forEach(place => {
      cafes.push({
        name: place.title || 'Sin nombre',
        slug: generateSlug(place.title),
        city: extractCity(place.address) || 'Buenos Aires',
        rating: place.rating || 0,
        image: place.thumbnail || '/cafes/fallback.jpg',
        address: place.address || '',
        phone: place.phone || '',
        website: place.website || '',
        reviews: place.reviews || 0,
        price: place.price || '',
        hours: place.hours || '',
        type: place.type || 'Café'
      });
    });
  }

  // Si no hay resultados locales, usar resultados orgánicos como fallback
  if (cafes.length === 0 && data.organic_results) {
    data.organic_results.slice(0, 8).forEach(result => {
      cafes.push({
        name: result.title || 'Sin nombre',
        slug: generateSlug(result.title),
        city: 'Buenos Aires',
        rating: 4.0, // Rating por defecto
        image: result.thumbnail || '/cafes/fallback.jpg',
        address: result.snippet || '',
        website: result.link || '',
        reviews: 0,
        type: 'Café'
      });
    });
  }

  return cafes;
}

// Función auxiliar para generar slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

// Función auxiliar para extraer ciudad de la dirección
function extractCity(address) {
  if (!address) return 'Buenos Aires';
  
  // Buscar patrones comunes de barrios de Buenos Aires
  const barrios = [
    'Palermo', 'Recoleta', 'San Telmo', 'La Boca', 'Caballito',
    'Barracas', 'Villa Crespo', 'Almagro', 'Boedo', 'Flores',
    'Belgrano', 'Núñez', 'Puerto Madero', 'Monserrat', 'Retiro'
  ];
  
  for (const barrio of barrios) {
    if (address.toLowerCase().includes(barrio.toLowerCase())) {
      return barrio;
    }
  }
  
  return 'Buenos Aires';
}

// Función para buscar cafés por barrio específico
export async function searchCafesByNeighborhood(neighborhood) {
  const query = `cafe ${neighborhood} Buenos Aires`;
  return await searchCafes(query, `${neighborhood}, Buenos Aires, Argentina`);
}

// Función para buscar cafés por tipo
export async function searchCafesByType(type) {
  const query = `${type} cafe Buenos Aires`;
  return await searchCafes(query, 'Buenos Aires, Argentina');
}

// Función para obtener cafés populares de la semana
export async function getPopularCafesThisWeek() {
  try {
    console.log('🔍 Obteniendo cafés populares de esta semana...');
    
    // Consultas para diferentes tipos de cafés populares
    const queries = [
      'cafe popular Buenos Aires',
      'mejor cafe Buenos Aires',
      'cafe recomendado Buenos Aires',
      'cafe trending Buenos Aires'
    ];
    
    const allCafes = [];
    
    // Buscar con diferentes consultas para obtener variedad
    for (const query of queries) {
      try {
        const cafes = await searchCafes(query, 'Buenos Aires, Argentina');
        allCafes.push(...cafes);
        
        // Pequeña pausa entre consultas
        await new Promise(resolve => setTimeout(resolve, 200));
        
      } catch (error) {
        console.warn(`Error en consulta "${query}":`, error);
      }
    }
    
    // Eliminar duplicados basándose en el nombre
    const uniqueCafes = allCafes.filter((cafe, index, self) => 
      index === self.findIndex(c => c.name === cafe.name)
    );
    
    // Ordenar por rating (más populares primero)
    const sortedCafes = uniqueCafes.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    console.log('✅ Cafés populares obtenidos:', sortedCafes.length);
    return sortedCafes.slice(0, 6); // Devolver solo los 6 mejores
    
  } catch (error) {
    console.error('❌ Error obteniendo cafés populares:', error);
    throw error;
  }
}
