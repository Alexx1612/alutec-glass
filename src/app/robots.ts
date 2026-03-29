import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.alutecglass.ro'; // Pune domeniul tău real aici când îl publici

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Spunem Google-ului să nu indexeze rutele de backend sau coșul (care e privat pentru fiecare user)
      disallow: ['/api/', '/cos/'],
    },
    // ACEASTA ESTE LEGĂTURA CĂTRE STRUCTURĂ:
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}