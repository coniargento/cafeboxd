export function autoTag(cafe) {
    const tags = [];
    const text = (cafe.description || "").toLowerCase();
    const types = cafe.types || [];
  
    // FLAT WHITE / CAFÉ DE ESPECIALIDAD
    if (
      types.includes("cafe") ||
      types.includes("coffee_shop") ||
      text.includes("espresso") ||
      text.includes("especialidad") ||
      text.includes("barista")
    ) {
      tags.push("flat-white");
    }
  
    // BRUNCH
    if (
      types.includes("breakfast_restaurant") ||
      types.includes("brunch_restaurant") ||
      text.includes("brunch") ||
      text.includes("desayuno")
    ) {
      tags.push("brunch");
    }
  
    // PASTELERÍA
    if (
      types.includes("bakery") ||
      text.includes("torta") ||
      text.includes("pastelería")
    ) {
      tags.push("pastry");
    }
  
    // WIFI / PARA TRABAJAR
    if (
      text.includes("wifi") ||
      text.includes("trabajar") ||
      types.includes("internet_cafe")
    ) {
      tags.push("study");
    }
  
    // PET-FRIENDLY
    if (
      text.includes("perro") ||
      text.includes("mascota") ||
      text.includes("pet")
    ) {
      tags.push("pet-friendly");
    }
  
    return tags;
  }
  