import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.alutecglass.ro'; // Pune domeniul tău real aici

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0, // Pagina Acasă e cea mai importantă
    },
    {
      url: `${baseUrl}/calcul`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9, // Calculatorul este magnetul tău de trafic
    },
    {
      url: `${baseUrl}/produse`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}