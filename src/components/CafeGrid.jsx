import PosterCard from "./PosterCard.jsx";

export default function CafeGrid({ cafes = [] }) {
  const list = Array.isArray(cafes) ? cafes : [];

  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
      {list.map((c) => (
        <PosterCard key={c.name} cafe={c} />
      ))}

      {list.length === 0 && (
        <div className="text-zinc-400">No hay cafés para mostrar.</div>
      )}
    </div>
  );
}


