export default function PosterCard({ cafe }) {
    const img = cafe?.image || "/cafes/fallback.jpg";
  
    return (
      <a
        href="#detalle" // luego lo cambiamos a /cafe/[slug]
        className="group relative block rounded-2xl overflow-hidden
                   border border-zinc-800 bg-zinc-950
                   transition-transform duration-300 will-change-transform
                   hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
        aria-label={cafe?.name}
      >
        {/* Póster 2:3 */}
        <div
          className="aspect-[2/3] bg-zinc-800 bg-center bg-cover"
          style={{ backgroundImage: `url(${img})` }}
        />
  
        {/* Overlay con info (aparece al hover) */}
        <div className="pointer-events-none absolute inset-0
                        flex items-end opacity-0 group-hover:opacity-100
                        bg-gradient-to-t from-black/85 via-black/40 to-transparent
                        transition-opacity">
          <div className="w-full p-3">
            <h3 className="text-base font-semibold leading-snug">{cafe?.name}</h3>
            <p className="text-xs text-zinc-300">{cafe?.city}</p>
          </div>
        </div>
  
        {/* Chip de rating siempre visible */}
        <div className="absolute bottom-2 right-2 rounded-full
                        bg-black/80 border border-zinc-800 px-2 py-0.5
                        text-xs text-zinc-200">
          ★ {Number(cafe?.rating ?? 0).toFixed(1)}
        </div>
      </a>
    );
  }
  