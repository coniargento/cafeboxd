import { useEffect, useState } from "react";

export default function UserBadge() {
  const [name, setName] = useState("");

  useEffect(() => {
    try {
      const n = localStorage.getItem("userName");
      if (n) setName(n);
    } catch {}
  }, []);

  const login = () => {
    const n = prompt("Tu nombre de usuario:");
    if (n && n.trim()) {
      const v = n.trim();
      setName(v);
      try { localStorage.setItem("userName", v); } catch {}
    }
  };

  const logout = () => {
    setName("");
    try { localStorage.removeItem("userName"); } catch {}
  };

  const initials = name
    ? name.split(" ").map(p => p[0]).join("").slice(0,2).toUpperCase()
    : "";

  return name ? (
    <div className="flex items-center gap-2">
      <div className="h-7 w-7 rounded-full bg-zinc-700 text-white grid place-items-center text-xs">
        {initials}
      </div>
      <span className="text-sm">{name}</span>
      <button onClick={logout} className="text-xs text-zinc-400 hover:text-zinc-200 underline">
        Salir
      </button>
    </div>
  ) : (
    <button onClick={login} className="text-sm px-3 py-1 rounded-lg border border-zinc-700 hover:bg-zinc-800">
      Iniciar sesión
    </button>
  );
}
