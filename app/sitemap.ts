import { MetadataRoute } from 'next';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.mihs.edu.np";

export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hospital.mihs.edu.np'; // Update with your actual domain
  
  // Fetch all departments to include in sitemap
  let departments: any[] = [];
  try {
    const res = await fetch(`${API_BASE}/v1/department/fetch-all-departments`, {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      const data = await res.json();
      departments = data?.Departments?.data || [];
    }
  } catch (err) {
    console.error('Sitemap fetch error:', err);
  }
  
  // Static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/notices`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];
  
  // Dynamic department routes
  const departmentRoutes: MetadataRoute.Sitemap = departments.map((dept) => ({
    url: `${baseUrl}/departments/${dept.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  
  return [...routes, ...departmentRoutes];
}
