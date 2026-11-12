import type { MetadataRoute } from 'next';
import { SITE, TOWNS } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, priority: 1 },
    { url: `${SITE.url}/battery-storage`, lastModified: now, priority: 0.9 },
    { url: `${SITE.url}/book-a-survey`, lastModified: now, priority: 0.9 },
    { url: `${SITE.url}/projects`, lastModified: now, priority: 0.7 },
    ...TOWNS.map((t) => ({ url: `${SITE.url}/areas/${t.slug}`, lastModified: now, priority: 0.8 })),
  ];
}
