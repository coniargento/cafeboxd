import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HomepageIntro() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    gsap.fromTo(
      el.querySelectorAll(".fade"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power2.out"
      }
    );

    gsap.to(el.querySelectorAll(".float"), {
      y: -8,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-6xl mx-auto px-4 py-14 relative overflow-hidden"
    >
      {/* Ilustración */}
      <div className="absolute right-8 top-4 opacity-30 hidden md:block">
        <svg
          className="w-32 float"
          fill="none"
          stroke="#facc15"
          strokeWidth="1.4"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="40" />
          <path d="M30 45 C45 70, 55 70, 70 45" />
        </svg>
      </div>

      {/* TEXTO PRINCIPAL */}
      <div className="text-center space-y-5 fade">
        <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 fade">
          Explorá la ciudad a través del café
        </h2>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto fade">
          Cafeboxd reúne reseñas reales, cafés de especialidad, lugares para 
          trabajar y rincones escondidos de Buenos Aires.  
          Todo en un solo lugar.
        </p>
      </div>

      {/* MÉTRICAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
        <Metric number="2300+" label="Cafeterías registradas" />
        <Metric number="50000+" label="Reseñas analizadas" />
        <Metric number="5" label="Categorías principales" />
      </div>

      {/* TEXTO EXTRA */}
      <p className="text-center text-zinc-600 dark:text-zinc-400 mt-10 fade">
        Algunas cafeterías inspiran; otras abrazan. Encontrá la que va con vos.
      </p>

      {/* CTA */}
      <div className="text-center mt-8 fade">
        <a
          href="/explorar"
          className="inline-block px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-semibold transition shadow-md"
        >
          Explora desde ahora →
        </a>
      </div>
    </section>
  );
}

/* Tarjetas más livianas y modernas */
function Metric({ number, label }) {
  return (
    <div className="fade text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-xl py-6">
      <div className="text-3xl font-bold text-amber-500">{number}</div>
      <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{label}</div>
    </div>
  );
}

