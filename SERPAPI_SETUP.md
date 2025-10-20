# Configuración de SerpApi para Cafeboxd

## 🚀 Integración Completada

Tu proyecto Cafeboxd ahora está integrado con SerpApi para obtener datos reales de cafeterías en Buenos Aires.

## 📋 Funcionalidades Agregadas

- ✅ **Búsqueda de cafés reales** usando Google Local API
- ✅ **Filtros por barrio** (Palermo, Recoleta, San Telmo, etc.)
- ✅ **Filtros por tipo** (café de especialidad, artesanal, etc.)
- ✅ **Datos en tiempo real** con calificaciones, reseñas y direcciones
- ✅ **Reseñas reales de Google Maps** con rotación automática
- ✅ **Sistema de caché inteligente** para optimizar llamadas a la API
- ✅ **Estados de carga** y manejo de errores
- ✅ **Fallback a datos estáticos** si la API falla

## 🔧 Configuración Requerida

### 1. Obtener API Key de SerpApi

1. Ve a [https://serpapi.com/](https://serpapi.com/)
2. Regístrate para obtener **250 búsquedas gratuitas por mes**
3. Copia tu API key del dashboard

### 2. Configurar la API Key

**Opción A: Variable de entorno (Recomendado)**
```bash
# Crear archivo .env.local en la raíz del proyecto
echo "SERPAPI_KEY=tu_api_key_aqui" > .env.local
```

**Opción B: Editar archivo de configuración**
Edita `src/config/serpapi.js` y reemplaza:
```javascript
API_KEY: 'demo', // Cambiar por tu API key real
```

### 3. Instalar dependencias (si es necesario)
```bash
npm install
```

### 4. Ejecutar el proyecto
```bash
npm run dev
```

## 🎯 Cómo Usar

1. **Búsqueda por texto**: Escribe el nombre de un café específico
2. **Filtro por barrio**: Selecciona un barrio de Buenos Aires
3. **Filtro por tipo**: Elige el tipo de café que buscas
4. **Búsquedas rápidas**: Usa los botones de búsqueda rápida

## 📊 Datos que Obtienes

- **Información básica**: Nombre, ubicación, calificación
- **Detalles adicionales**: Dirección, teléfono, sitio web
- **Reseñas reales**: Reseñas auténticas de Google Maps con rotación automática
- **Datos de usuarios**: Nombres, fotos de perfil, verificaciones
- **Precios**: Rango de precios (cuando disponible)
- **Horarios**: Horarios de funcionamiento
- **Fotos**: Imágenes reales del lugar

## 🔄 Flujo de Datos

1. Usuario realiza búsqueda
2. Se envía consulta a SerpApi
3. Se procesan los resultados de Google Local
4. Se obtienen reseñas reales de Google Maps
5. Se muestran en el grid con información enriquecida
6. Las reseñas rotan automáticamente cada 10 segundos
7. Si falla, se muestran datos estáticos como respaldo

## 🛠️ Archivos Modificados

- `src/services/serpapi.js` - Servicio principal de SerpApi
- `src/services/googleMapsReviews.js` - Servicio para reseñas de Google Maps
- `src/config/serpapi.js` - Configuración y constantes
- `src/components/CafeSearch.jsx` - Componente de búsqueda
- `src/components/CafeExplorer.jsx` - Wrapper que conecta búsqueda y grid
- `src/components/CafeGrid.jsx` - Grid actualizado con estados de carga
- `src/components/PosterCard.jsx` - Tarjeta con información adicional
- `src/components/ReviewCard.jsx` - Tarjeta individual de reseña
- `src/components/ReviewsSection.jsx` - Sección de reseñas con rotación automática
- `src/pages/index.astro` - Página principal actualizada

## 🚨 Notas Importantes

- **Límite de búsquedas**: 250 por mes en plan gratuito
- **Fallback**: Si la API falla, se muestran datos estáticos
- **Caché**: Los resultados se mantienen durante la sesión
- **Error handling**: Manejo robusto de errores de red

## 🔧 Personalización

Puedes modificar:
- Barrios en `SERPAPI_CONFIG.NEIGHBORHOODS`
- Tipos de café en `SERPAPI_CONFIG.CAFE_TYPES`
- Ubicación por defecto en `SERPAPI_CONFIG.DEFAULT_LOCATION`

## 📈 Próximos Pasos

- Implementar caché local para reducir llamadas a la API
- Agregar más filtros (precio, horarios, etc.)
- Integrar con mapas para mostrar ubicaciones
- Agregar funcionalidad de favoritos
- Implementar reseñas de usuarios

¡Tu proyecto Cafeboxd ahora tiene datos reales de cafeterías! 🎉
