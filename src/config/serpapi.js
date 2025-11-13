// Configuración de SerpApi
export const SERPAPI_CONFIG = {
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
  return import.meta.env.SERPAPI_KEY;
}