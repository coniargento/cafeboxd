import { useEffect, useState } from "react";

export default function WelcomeUser() {
  const [name, setName] = useState(""); // ⟵ NO leemos localStorage al montar

  useEffect(() => {
    // Solo reaccionamos a logueo/salida en esta sesión
    const onChange = (e) => {
      const n = e?.detail?.name || "";
      setName(n);
    };
    window.addEventListener("user:change", onChange);
    return () => window.removeEventListener("user:change", onChange);
  }, []);

  if (!name) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-zinc-900 dark:to-zinc-800 p-6 shadow-lg">
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-orange-200/20 dark:from-amber-400/10 dark:to-orange-400/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-200/20 to-orange-200/20 dark:from-amber-400/10 dark:to-orange-400/10 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10 flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-2xl">☕</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
            ¡Hola, {name}! 👋
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300">
            Chusmea donde tomar tu próxima taza de café...
          </p>
        </div>
      </div>
    </div>
  );
}
