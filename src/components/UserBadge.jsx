import { useEffect, useState } from "react";
import LoginModal from "./LoginModal.jsx";

function dispatchUserChange(name) {
  try {
    window.dispatchEvent(new CustomEvent("user:change", { detail: { name } }));
  } catch {}
}

export default function UserBadge() {
  const [name, setName] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    try {
      const n = localStorage.getItem("userName");
      if (n) setName(n);
    } catch {}
  }, []);

  // Escuchar cambios de usuario desde el modal
  useEffect(() => {
    const onChange = (e) => {
      const n = e?.detail?.name || "";
      setName(n);
    };
    window.addEventListener("user:change", onChange);
    return () => window.removeEventListener("user:change", onChange);
  }, []);

  const login = () => {
    setShowLoginModal(true);
  };

  const logout = () => {
    setName("");
    try { localStorage.removeItem("userName"); } catch {}
    dispatchUserChange("");            // <- limpia el saludo
  };

  const initials = name
    ? name.split(" ").map(p => p[0]).join("").slice(0,2).toUpperCase()
    : "";

  return (
    <>
      {name ? (
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
        <button 
          onClick={login} 
          data-login-trigger
          className="text-sm px-3 py-1 rounded-lg border border-zinc-700 hover:bg-zinc-800"
        >
          Iniciar sesión
        </button>
      )}
      
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
}

