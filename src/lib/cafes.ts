import base from "../data/cafes.json";

function extractCity(address = "") {
  const barrios = [
    "Palermo","Recoleta","San Telmo","La Boca","Caballito",
    "Barracas","Villa Crespo","Almagro","Boedo","Flores",
    "Belgrano","Núñez","Puerto Madero","Monserrat","Retiro"
  ];
  for (const b of barrios) {
    if (address?.toLowerCase().includes(b.toLowerCase())) return b;
  }
  return "Buenos Aires";
}

export function normalizeLocal(list: any[]) {
  return list.map((c) => ({
    id: c.place_id,
    slug: (c.title || "cafe").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: c.title,
    rating: Number(c.rating) || 0,
    reviews: Number(c.reviews) || 0,
    address: c.address || "",
    city: extractCity(c.address),
    image: c.thumbnail || "/cafes/fallback.jpg",
    description: c.description || "",
  }));
}

export const cafes = normalizeLocal(base);
