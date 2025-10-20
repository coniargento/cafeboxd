import PosterCard from "./PosterCard.jsx";

export default function CafeGrid({ cafes = [], isLoading = false, error = null }) {
  const list = Array.isArray(cafes) ? cafes : [];

  // Mostrar estado de carga
  if (isLoading) {
    return (
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <div 
            key={index}
            className="animate-pulse"
          >
            <div className="bg-zinc-200 dark:bg-zinc-700 rounded-2xl h-80 w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="col-span-full text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <div className="text-xl text-red-400 mb-2">Error al cargar cafés</div>
        <div className="text-sm text-zinc-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {list.map((c, index) => (
        <div 
          key={`${c.name}-${c.slug}-${index}`} 
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <PosterCard cafe={c} />
        </div>
      ))}

      {list.length === 0 && !isLoading && (
        <div className="col-span-full text-center py-12">
          <div className="text-6xl mb-4">☕</div>
          <div className="text-xl text-zinc-400 mb-2">No hay cafés para mostrar</div>
          <div className="text-sm text-zinc-500">Prueba con una búsqueda diferente</div>
        </div>
      )}
    </div>
  );
}


