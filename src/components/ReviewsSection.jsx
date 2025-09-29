import { useState, useEffect } from "react";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de reseñas
    const loadReviews = async () => {
      try {
        // En una app real, esto vendría de una API
        const response = await fetch('/src/data/reviews.json');
        const data = await response.json();
        
        // Ordenar por fecha (más recientes primero) y tomar las 6 más recientes
        const sortedReviews = data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6);
        
        setReviews(sortedReviews);
      } catch (error) {
        console.error('Error loading reviews:', error);
        // Fallback con reseñas hardcodeadas
        setReviews([
          {
            id: 1,
            cafeSlug: "mode-cafe",
            cafeName: "Mode Café",
            userName: "CaféLover23",
            userAvatar: "CL",
            rating: 5,
            review: "El mejor café de especialidad en Barracas. El ambiente es perfecto para trabajar y el barista realmente sabe lo que hace.",
            date: "2024-01-15",
            likes: 12,
            isVerified: true
          },
          {
            id: 2,
            cafeSlug: "cuervo",
            cafeName: "Cuervo",
            userName: "CoffeeExplorer",
            userAvatar: "CE",
            rating: 5,
            review: "Increíble experiencia. El café tiene un sabor único y el lugar tiene una vibra muy especial en Palermo.",
            date: "2024-01-14",
            likes: 8,
            isVerified: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
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
      <div className="bg-white dark:bg-zinc-950 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
              Cargando reseñas...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white dark:bg-zinc-950 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
          Escribí y compartí reseñas. Armá tus propias listas. Compartí tu vida en cafés.
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            A continuación se muestran reseñas y listas populares de esta semana. Regístrate para crear las tuyas.
          </p>
        </div>
        
        {/* Popular Reviews */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
              Reseñas populares de esta semana
            </h3>
            
            <div className="space-y-4">
              {reviews.slice(0, 3).map((review) => (
                <div key={review.id} className="border-l-4 border-amber-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {review.cafeName}
                    </span>
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-zinc-600 text-white text-xs flex items-center justify-center">
                        {review.userAvatar}
                      </div>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        por <span className="font-medium">{review.userName}</span>
                        {review.isVerified && (
                          <span className="ml-1 text-blue-500">✓</span>
                        )}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500">
                      {formatDate(review.date)}
                    </span>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
                    "{review.review}"
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <button className="flex items-center gap-1 text-xs text-zinc-500 hover:text-red-500 transition-colors">
                      <span>❤️</span>
                      <span>{review.likes}</span>
                    </button>
                  
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
              Listas populares
            </h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Mejores cafeterías de especialidad
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                  por <span className="font-medium">BaristaPro</span> • 15 cafeterías
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Cafeterías para trabajar
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                  por <span className="font-medium">RemoteWorker</span> • 12 cafeterías
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
