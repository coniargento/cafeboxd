import PosterCard from "./PosterCard.jsx";

export default function CafeGrid({ cafes = [] }) {
  const list = Array.isArray(cafes) ? cafes : [];

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {list.map((c, index) => (
        <div 
          key={c.name} 
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <PosterCard cafe={c} />
        </div>
      ))}

      {list.length === 0 && (
        <div className="col-span-full text-center py-12">
          <div className="text-6xl mb-4">☕</div>
          <div className="text-xl text-zinc-400 mb-2">No hay cafés para mostrar</div>
          <div className="text-sm text-zinc-500">Pronto agregaremos más opciones</div>
        </div>
      )}
    </div>
  );
}


