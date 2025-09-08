
import { useLayoutEffect, useRef } from "react";

export default function RevealBox({ children }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    (async () => {
      const gsapMod = await import("gsap");
      const gsap = gsapMod.gsap || gsapMod.default || gsapMod;
      const el = ref.current;
      if (!el) return;

      // Estado inicial y animación al montar
      gsap.set(el, { opacity: 0, y: 32 });
      gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
    })();
  }, []);

  return (
    <div ref={ref} className="mt-6 p-4 bg-zinc-900 rounded-xl">
      {children}
    </div>
  );
}
