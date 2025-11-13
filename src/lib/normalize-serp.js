import { autoTag } from "./autoTags.js";

export function normalizeSerpItem(item) {
  const cafe = {
    id: item.place_id,
    name: item.title,
    rating: item.rating || 0,
    reviews: item.reviews || 0,
    address: item.address || "",
    city: extractCity(item.address),
    image: item.thumbnail || "/cafes/fallback.jpg",
    description: item.description || "",
    types: item.type || item.types || [],
  };

  cafe.tags = autoTag(cafe);
  return cafe;
}

export function extractReviewsFromSerp(raw) {
  if (!raw?.local_results?.places) return [];

  const reviews = [];

  for (const place of raw.local_results.places) {
    if (!place.reviews) continue;

    place.reviews.forEach(r => {
      reviews.push({
        id: `${place.place_id}-${r.date}`,
        author: r.author || "Usuario",
        rating: r.rating || 5,
        text: r.excerpt || "",
        date: r.date,
        placeName: place.title,
        placeSlug: place.place_id,
        verified: r.author ? true : false
      });
    });
  }

  return reviews;
}
