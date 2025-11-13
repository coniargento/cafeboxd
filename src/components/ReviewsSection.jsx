import { useState, useEffect } from "react";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Cargando reseñas desde API endpoint...');
      
      // Llamar al endpoint de Astro (evita CORS)
      const response = await fetch('/api/reviews.json');
      
      if (!response.ok) {
        throw new Error(`Error en API: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        console.log('✅ Reseñas obtenidas desde API:', data.reviews.length);
        setReviews(data.reviews);
      } else {
        throw new Error(data.error || 'Error desconocido');
      }
      
    } catch (error) {
      console.error('❌ Error cargando reseñas:', error);
      setError('No se pudieron cargar las reseñas reales');
      
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return 'Hace 1 día';
      if (diffDays < 7) return `Hace ${diffDays} días`;
      if (diffDays < 30) return `Hace ${Math.ceil(diffDays / 7)} semanas`;
      return `Hace ${Math.ceil(diffDays / 30)} meses`;
    } catch {
      return 'Reciente';
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-sm ${
          i < rating ? 'text-amber-400' : 'text-zinc-300 dark:text-zinc-600'
        }`}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <section className="bg-white dark:bg-zinc-950 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
              Cargando reseñas...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-zinc-950 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
            Reseñas Reales de Google Maps
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Descubrí qué dicen los usuarios reales sobre las cafeterías de Buenos Aires
          </p>
        </div>
        
        {/* Grid de reseñas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-700"
            >
              {/* Header de la reseña */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {/* Avatar del usuario con foto simulada */}
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm relative overflow-hidden">
                  <img 
                    src={review.avatar}
                    alt={review.author}
                    className="w-full h-full rounded-full object-cover"
                  />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm" style={{display: 'none'}}>
                      {review.author.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {review.author}
                      </h4>
                      {review.verified && (
                        <span className="text-blue-500 text-xs" title="Usuario verificado">
                          ✓
                        </span>
                      )}
                    </div>
                    <a 
                      href={`/cafe/${review.placeSlug}`}
                      className="text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      {review.placeName}
                    </a>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                </div>
              </div>

              {/* Texto de la reseña */}
              <p className="text-zinc-700 dark:text-zinc-300 mb-4 leading-relaxed">
                "{review.text}"
              </p>

              {/* Footer de la reseña */}
              <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
                <span>{formatDate(review.date)}</span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
