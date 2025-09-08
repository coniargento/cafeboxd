import { useMemo, useState } from "react";
import FilterBar from "./FilterBar.jsx";
import CafeGrid from "./CafeGrid.jsx";

export default function CafeExplorer({ cafes=[] }) {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");

  const cities = useMemo(
    () => Array.from(new Set(cafes.map(c => c.city))).sort(),
    [cafes]
  );

  const filtered = useMemo(() => {
    const ql = q.toLowerCase().trim();
    return cafes.filter(c => {
      const okQ = ql ? c.name.toLowerCase().includes(ql) : true;
      const okCity = city ? c.city === city : true;
      return okQ && okCity;
    });
  }, [cafes, q, city]);

  return (
    <div>
      <FilterBar q={q} setQ={setQ} city={city} setCity={setCity} cities={cities} />
      <div className="mt-4">
        <CafeGrid cafes={filtered} />
        {filtered.length === 0 && (
          <div className="text-zinc-400 mt-4">No hay resultados con esos filtros.</div>
        )}
      </div>
    </div>
  );
}