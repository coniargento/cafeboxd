// Importa la base limpia (array plano)
import cafes from "../data/cafes.json";

// 1) Obtener todos los cafés
export function getCafes() {
  return cafes;
}

// 2) Obtener café por ID (para /cafe/[id])
export function getCafeById(id: string) {
  return cafes.find((cafe) => cafe.place_id === id);
}

// 3) Obtener todas las categorías únicas
export function getCategories() {
  const categories = new Set(cafes.map((c) => c.category));
  return Array.from(categories);
}

// 4) Agrupar cafés por categoría (Explore)
export function getCafesByCategory() {
  const groups: Record<string, any[]> = {};

  cafes.forEach((cafe) => {
    if (!groups[cafe.category]) groups[cafe.category] = [];
    groups[cafe.category].push(cafe);
  });

  return groups;
}

// 5) Filtrar por tipo (wifi, brunch, specialty, etc.)
export function filterByType(type: string) {
  return cafes.filter((cafe) => cafe.types.includes(type));
}

// 6) Buscar cafés por texto (búsqueda futura)
export function searchCafes(query: string) {
  const q = query.toLowerCase();
  return cafes.filter((cafe) =>
    cafe.title.toLowerCase().includes(q) ||
    cafe.address.toLowerCase().includes(q) ||
    cafe.description.toLowerCase().includes(q)
  );
}
