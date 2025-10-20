export default function PosterCard({ cafe }) {
    const img = cafe?.image || "/cafes/fallback.jpg";
    const href = cafe?.slug ? `/cafe/${cafe.slug}` : "#"; // usar slug
  
    return (
      <a
        href={href}
        className="group relative block rounded-2xl overflow-hidden
                   border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950
                   transition-all duration-300 will-change-transform
                   hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20
                   hover:border-zinc-300 dark:hover:border-zinc-700"
        aria-label={cafe?.name}
      >
        {/* Imagen principal */}
        <div
          className="aspect-[4/5] bg-zinc-100 dark:bg-zinc-800 bg-center bg-cover relative overflow-hidden"
          style={{ backgroundImage: `url(${img})` }}
        >
          {/* Overlay sutil */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
  
        {/* Información del café */}
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
            {cafe?.name}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{cafe?.city}</p>
          
          {/* Rating con estrellas */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < Math.floor(cafe?.rating || 0)
                        ? 'text-amber-400'
                        : 'text-zinc-300 dark:text-zinc-600'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {Number(cafe?.rating ?? 0).toFixed(1)}
              </span>
              {cafe?.reviews && (
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  ({cafe.reviews} reseñas)
                </span>
              )}
            </div>
            
            {/* Indicador de "Ver más" */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                Ver detalles →
              </span>
            </div>
          </div>

          {/* Información adicional de la API */}
          {(cafe?.address || cafe?.price || cafe?.type) && (
            <div className="space-y-1 pt-2 border-t border-zinc-200 dark:border-zinc-700">
              {cafe?.type && (
                <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  {cafe.type}
                </div>
              )}
              {cafe?.address && (
                <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  📍 {cafe.address}
                </div>
              )}
              {cafe?.price && (
                <div className="text-xs text-green-600 dark:text-green-400">
                  💰 {cafe.price}
                </div>
              )}
            </div>
          )}
        </div>
      </a>
    );
  }
  
  