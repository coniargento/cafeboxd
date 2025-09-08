export default function CafeCard({ cafe }) {
    return (
      <article className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 p-4">
        <h3 className="text-lg font-semibold">{cafe.name}</h3>
        <p className="text-sm text-zinc-400">{cafe.city}</p>
        <p className="text-sm">★ {cafe.rating.toFixed(1)}</p>
      </article>
    );
}
  