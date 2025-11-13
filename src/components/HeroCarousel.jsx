import { useState, useEffect } from "react";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Datos de las cafeterías para el carrusel
  const cafes = [
    {
      name: "Mode Café",
      image: "/cafes/mode.jpg",
      location: "Barracas",
      rating: 4.6,
      description: "Café de especialidad en el corazón de Barracas"
    },
    {
      name: "Cuervo",
      image: "/cafes/cuervo.jpg", 
      location: "Palermo",
      rating: 4.9,
      description: "Ambiente único y café excepcional"
    },
    {
      name: "Puzzi",
      image: "/cafes/puzzi.jpg",
      location: "Barracas", 
      rating: 4.6,
      description: "Tradición italiana en Buenos Aires"
    },
    {
      name: "Amelia",
      image: "/cafes/amelia.jpg",
      location: "Caballito",
      rating: 3.9,
      description: "Café acogedor para trabajar y relajarse"
    },
    {
      name: "Nica Café",
      image: "/cafes/nica.jpg",
      location: "San Telmo",
      rating: 3.5,
      description: "Sabor auténtico en el barrio histórico"
    }
  ];

  // Rotación automática cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cafes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [cafes.length]);

  // Conectar el botón de login
  useEffect(() => {
    const mainLoginBtn = document.getElementById('main-login-btn');
    if (mainLoginBtn) {
      mainLoginBtn.addEventListener('click', () => {
        // Simular click en el botón de login del header
        const headerLoginBtn = document.querySelector('[data-login-trigger]');
        if (headerLoginBtn) {
          headerLoginBtn.click();
        }
      });
    }
  }, []);


  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background con gradiente overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900"></div>
      
      {/* Carrusel de imágenes */}
      <div className="absolute inset-0">
        {cafes.map((cafe, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-20' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${cafe.image})` }}
          />
        ))}
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
          Cafeboxd
        </h1>
        <p className="text-2xl md:text-3xl text-zinc-300 mb-4 max-w-3xl mx-auto leading-relaxed">
        Calificá cada taza.
        Guardá nuevos spots.
        Contá qué vale la pena.
        </p>
        {/* Nombre de la cafetería vertical en el costado derecho */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
          <div className="writing-vertical text-white text-2xl md:text-3xl font-bold tracking-wider opacity-90">
            <a href={`/cafe/${cafes[currentSlide].name.toLowerCase().replace(/\s+/g, '-')}/`} className="text-white hover:text-amber-400 transition-colors duration-300">
              {cafes[currentSlide].name}
            </a>
          </div>
        </div>
        
        {/* Main CTA - Solo botón */}
        <div className="mb-4">
          <button 
            id="main-login-btn"
            className="bg-pink-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 text-lg"
          >
            Arrancá ahora — es gratis :)
          </button>
        </div>
        
        {/* Texto descriptivo debajo del botón */}
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
          Tu espacio para encontrar nuevos cafecitos
        </p>
        
      </div>
      
      
    </section>
  );
}
