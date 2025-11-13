// src/lib/normalize.ts
export type Cafe = {
    id: string;
    name: string;
    slug: string;
    city?: string;
    rating?: number | null;
    image?: string;
    address?: string;
    type?: string;
  };
  
  export function slugify(input: string): string {
    return (input || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  
  export function extractCity(address?: string, fallback = ''): string {
    if (!address) return fallback || '';
    const parts = address.split(',').map(p => p.trim()).filter(Boolean);
    if (parts.length === 0) return fallback || '';
    const cand = parts.length >= 2 ? (parts[parts.length - 2] || parts[parts.length - 1]) : parts[0];
    return cand || fallback || '';
  }
  
  export function toCafesFromSerpRaw(raw: any): Cafe[] {
    const base = (raw && 'default' in (raw as any)) ? (raw as any).default : raw;
    if (Array.isArray(base) && base.length && typeof base[0] === 'object' && 'name' in base[0] && 'slug' in base[0]) {
      return base as Cafe[];
    }
    const places = Array.isArray(base?.local_results?.places) ? base.local_results.places : [];
    const locFallback = (base?.search_parameters?.location as string) || '';
    return (places as any[]).map((p) => {
      const title = p.title || p.name || '';
      return {
        id: String(p.place_id ?? slugify(title)),
        name: title || 'Café',
        slug: slugify(title || ''),
        city: extractCity(p.address, locFallback),
        rating: typeof p.rating === 'number' ? p.rating : undefined,
        image: p.thumbnail || p.photos?.[0]?.image || '/cafes/fallback.jpg',
        address: p.address || '',
        type: p.type || undefined,
      } as Cafe;
    });
  }
  