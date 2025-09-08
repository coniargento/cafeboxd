export default function FilterBar({ q, setQ, city, setCity, cities=[] }) {
    return (
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-end mt-6">
        <div className="flex-1">
          <label className="text-sm text-zinc-400">Buscar</label>
          <input
            value={q} onChange={(e)=>setQ(e.target.value)}
            placeholder="Nombre de la cafetería"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 outline-none focus:border-zinc-600"
          />
        </div>
        <div>
          <label className="text-sm text-zinc-400">Ciudad</label>
          <select
            value={city} onChange={(e)=>setCity(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2"
          >
            <option value="">Todas</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
    );
  }
  