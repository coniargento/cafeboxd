export function buildCategoriesFromItems(items) {
    const categories = {};
  
    items.forEach(cafe => {
      // categoría por tipo declarado
      if (cafe.type) {
        categories[cafe.type] ||= [];
        categories[cafe.type].push(cafe);
      }
  
      // categoría por palabras en título
      if (cafe.title?.toLowerCase().includes("brunch")) {
        categories["Brunch"] ||= [];
        categories["Brunch"].push(cafe);
      }
  
      if (cafe.title?.toLowerCase().includes("especialidad")) {
        categories["Café de especialidad"] ||= [];
        categories["Café de especialidad"].push(cafe);
      }
  
      // categoría por barrio detectado
      if (cafe.city) {
        categories[cafe.city] ||= [];
        categories[cafe.city].push(cafe);
      }
    });
  
    return categories;
  }
  