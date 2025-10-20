// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    define: {
      // Permitir acceso a variables de entorno en el cliente
      'import.meta.env.SERPAPI_KEY': JSON.stringify(process.env.SERPAPI_KEY || 'demo')
    }
  },
  
  // Configurar variables de entorno para el servidor
  server: {
    port: 4322
  }
});