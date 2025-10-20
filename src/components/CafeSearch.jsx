import { useState } from 'react';
import { searchCafes, searchCafesByNeighborhood, searchCafesByType } from '../services/serpapi.js';
import { SERPAPI_CONFIG } from '../config/serpapi.js';

export default function CafeSearch({ onCafesFound, onLoading, onError }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    onLoading?.(true);

    try {
      let cafes = [];

      if (selectedNeighborhood) {
        // Búsqueda por barrio
        cafes = await searchCafesByNeighborhood(selectedNeighborhood);
      } else if (selectedType) {
        // Búsqueda por tipo
        cafes = await searchCafesByType(selectedType);
      } else if (searchQuery) {
        // Búsqueda personalizada
        cafes = await searchCafes(searchQuery);
      } else {
        // Búsqueda por defecto
        cafes = await searchCafes();
      }

      onCafesFound?.(cafes);
    } catch (error) {
      console.error('Error en búsqueda:', error);
      onError?.(error.message || 'Error al buscar cafés');
    } finally {
      setIsLoading(false);
      onLoading?.(false);
    }
  };

  const handleQuickSearch = async (type) => {
    setSelectedType(type);
    setSearchQuery('');
    setSelectedNeighborhood('');
    
    setIsLoading(true);
    onLoading?.(true);

    try {
      const cafes = await searchCafesByType(type);
      onCafesFound?.(cafes);
    } catch (error) {
      console.error('Error en búsqueda rápida:', error);
      onError?.(error.message || 'Error al buscar cafés');
    } finally {
      setIsLoading(false);
      onLoading?.(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg mb-8">
      <h3 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">
        Buscar Cafés
      </h3>

      {/* Búsqueda personalizada */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar cafés específicos..."
            className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white rounded-lg font-medium transition-colors"
          >
            {isLoading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </form>

      {/* Filtros */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Filtro por barrio */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Barrio
          </label>
          <select
            value={selectedNeighborhood}
            onChange={(e) => setSelectedNeighborhood(e.target.value)}
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-amber-500"
            disabled={isLoading}
          >
            <option value="">Todos los barrios</option>
            {SERPAPI_CONFIG.NEIGHBORHOODS.map(neighborhood => (
              <option key={neighborhood} value={neighborhood}>
                {neighborhood}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por tipo */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Tipo de Café
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-amber-500"
            disabled={isLoading}
          >
            <option value="">Todos los tipos</option>
            {SERPAPI_CONFIG.CAFE_TYPES.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Búsquedas rápidas */}
      <div>
        <h4 className="text-lg font-semibold mb-3 text-zinc-900 dark:text-zinc-100">
          Búsquedas Rápidas
        </h4>
        <div className="flex flex-wrap gap-2">
          {SERPAPI_CONFIG.CAFE_TYPES.map(type => (
            <button
              key={type}
              onClick={() => handleQuickSearch(type)}
              disabled={isLoading}
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-700 hover:bg-amber-100 dark:hover:bg-amber-900 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Estado de carga */}
      {isLoading && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-lg">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600 mr-2"></div>
            Buscando cafés...
          </div>
        </div>
      )}
    </div>
  );
}
