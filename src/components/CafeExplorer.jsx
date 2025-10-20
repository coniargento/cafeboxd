import { useState, useEffect } from 'react';
import CafeSearch from './CafeSearch.jsx';
import CafeGrid from './CafeGrid.jsx';
import { searchCafes } from '../services/serpapi.js';

export default function CafeExplorer({ initialCafes = [] }) {
  const [cafes, setCafes] = useState(initialCafes);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar cafés iniciales al montar el componente
  useEffect(() => {
    if (initialCafes.length === 0) {
      loadInitialCafes();
    }
  }, []);

  const loadInitialCafes = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const initialResults = await searchCafes('cafe de especialidad Buenos Aires');
      setCafes(initialResults);
    } catch (err) {
      console.error('Error cargando cafés iniciales:', err);
      setError('No se pudieron cargar los cafés. Usando datos de ejemplo.');
      // Mantener los datos estáticos como fallback
    } finally {
      setIsLoading(false);
    }
  };

  const handleCafesFound = (newCafes) => {
    setCafes(newCafes);
    setError(null);
  };

  const handleLoading = (loading) => {
    setIsLoading(loading);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setIsLoading(false);
  };

  return (
    <div>
      {/* Componente de búsqueda */}
      <CafeSearch 
        onCafesFound={handleCafesFound}
        onLoading={handleLoading}
        onError={handleError}
      />
      
      {/* Grid de resultados */}
      <CafeGrid 
        cafes={cafes}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}