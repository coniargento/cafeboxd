export async function get() {
  const reviews = [
    {
      id: "1",
      author: "María G.",
      rating: 5,
      text: "El flat white más rico que probé en Buenos Aires.",
      date: "2024-10-10",
      placeName: "Café Cuervo",
      placeSlug: "cafe-cuervo",
      verified: true
    },
    {
      id: "2",
      author: "Julián R.",
      rating: 4,
      text: "Excelente ambiente para trabajar y muy buena pastelería.",
      date: "2024-09-22",
      placeName: "Amelia Café",
      placeSlug: "amelia-cafe",
      verified: false
    },
    {
      id: "3",
      author: "Sofía P.",
      rating: 5,
      text: "Atención impecable y un cappuccino soñado.",
      date: "2024-11-01",
      placeName: "Puzzi Café",
      placeSlug: "puzzi-cafe",
      verified: true
    }
  ];

  return new Response(
    JSON.stringify({ success: true, reviews }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}


