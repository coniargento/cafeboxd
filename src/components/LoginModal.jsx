import { useState, useEffect } from "react";

export default function LoginModal({ isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setError("");
    setEmail("");
    setPassword("");
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
    setEmail("");
    setPassword("");
  };

  const handleGoogleLogin = () => {
    // Simular login con Google
    const name = "Usuario Google";
    localStorage.setItem('userName', name);
    window.dispatchEvent(new CustomEvent("user:change", { detail: { name } }));
    handleClose();
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    setError("");
    
    if (!email.trim() || !password.trim()) {
      setError("Por favor completa todos los campos");
      return;
    }
    
    if (isSignUp && password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    
    // Simular validación de login/registro
    if (isSignUp) {
      // Simular registro
      const name = email.split('@')[0];
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPassword', password); // En producción esto sería hasheado
      window.dispatchEvent(new CustomEvent("user:change", { detail: { name } }));
      handleClose();
    } else {
      // Simular login - verificar si existe el usuario
      const storedEmail = localStorage.getItem('userEmail');
      const storedPassword = localStorage.getItem('userPassword');
      
      if (email === storedEmail && password === storedPassword) {
        const name = localStorage.getItem('userName') || email.split('@')[0];
        window.dispatchEvent(new CustomEvent("user:change", { detail: { name } }));
        handleClose();
      } else {
        setError("Email o contraseña incorrectos");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay p-4 transition-all duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      {/* Backdrop con blur */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={handleClose}
      />
      
      {/* Modal centrado */}
      <div className={`modal-content bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
        isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-zinc-300 dark:border-zinc-700 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-medium text-zinc-900 dark:text-zinc-100 mb-4 google-button"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-300 dark:border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-zinc-900 text-zinc-500">o</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Email Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 modal-input"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 modal-input"
                placeholder={isSignUp ? "Mínimo 8 caracteres" : "Tu contraseña"}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              {isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
            </button>
          </form>

          {/* Forgot Password Link */}
          {!isSignUp && (
            <div className="text-center mt-4">
              <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          {/* Toggle Sign Up/Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
              <button
                onClick={toggleMode}
                className="ml-1 text-amber-600 hover:text-amber-700 font-medium"
              >
                {isSignUp ? 'Iniciar sesión' : 'Crear cuenta'}
              </button>
            </p>
          </div>

          {/* Terms */}
          <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400 text-center">
            Al continuar, aceptas nuestros{' '}
            <a href="#" className="text-amber-600 hover:text-amber-700">Términos de servicio</a>
            {' '}y{' '}
            <a href="#" className="text-amber-600 hover:text-amber-700">Política de privacidad</a>
          </p>
        </div>
      </div>
    </div>
  );
}
