// Endpoint de Astro para obtener reseñas (evita CORS)
import { getCachedRandomReviews } from '../../services/googleMapsReviews.js';

export async function GET() {
  try {
    console.log('🔍 API endpoint: Obteniendo reseñas...');
    
    const reviews = await getCachedRandomReviews(6);
    
    console.log('✅ API endpoint: Reseñas obtenidas:', reviews.length);
    
    return new Response(JSON.stringify({
      success: true,
      reviews: reviews
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
    
  } catch (error) {
    console.error('❌ API endpoint: Error obteniendo reseñas:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      reviews: []
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
