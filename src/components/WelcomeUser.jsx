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
    <div className="mt-4 mb-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-zinc-100">
      {`Bienvenido de nuevo, ${name}. Esto es lo que hemos estado viendo...`}
    </div>
  );
}
