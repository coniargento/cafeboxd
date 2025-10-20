// Configuración de SerpApi
export const SERPAPI_CONFIG = {
  // Reemplaza con tu API key real
  API_KEY: 'e57976d3e62c00e3e7d3dc0600067c1c265ba2e39634d4e49e1572d8921c55b2', // Tu API key de SerpApi
  
  // Configuración por defecto
  DEFAULT_LOCATION: 'Buenos Aires, Argentina',
  DEFAULT_LANGUAGE: 'es',
  DEFAULT_COUNTRY: 'ar',
  DEFAULT_DOMAIN: 'google.com.ar',
  
  // Barrios de Buenos Aires para búsquedas específicas
  NEIGHBORHOODS: [
    'Palermo', 'Recoleta', 'San Telmo', 'La Boca', 'Caballito',
    'Barracas', 'Villa Crespo', 'Almagro', 'Boedo', 'Flores',
    'Belgrano', 'Núñez', 'Puerto Madero', 'Monserrat', 'Retiro'
  ],
  
  // Tipos de cafés para búsquedas
  CAFE_TYPES: [
    'cafe de especialidad',
    'cafe artesanal',
    'cafe tostado',
    'cafe de barrio',
    'cafe con wifi',
    'cafe para trabajar'
  ],

  // Configuración para reseñas
  REVIEWS: {
    ROTATION_INTERVAL: 10000, // 10 segundos
    CACHE_DURATION: 30 * 60 * 1000, // 30 minutos
    MAX_REVIEWS_PER_CAFE: 3,
    MAX_CAFES_TO_SEARCH: 5
  }
};

// Función para obtener la API key (primero de variables de entorno, luego del config)
export function getApiKey() {
  const envKey = process.env.SERPAPI_KEY;
  const configKey = SERPAPI_CONFIG.API_KEY;
  
  console.log('🔑 API Key check:');
  console.log('  - process.env.SERPAPI_KEY:', envKey ? 'SET' : 'NOT SET');
  console.log('  - SERPAPI_CONFIG.API_KEY:', configKey);
  
  return envKey || configKey;
}
