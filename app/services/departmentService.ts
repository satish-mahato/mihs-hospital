import type { DepartmentData, DepartmentsApiResponse, DepartmentApiResponse } from "@/types/department";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.mihs.edu.np";

export async function fetchDepartments(): Promise<DepartmentData[]> {
  try {
    const res = await fetch(`${API_BASE}/v1/department/fetch-all-departments`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    if (!res.ok) return [];
    const data: DepartmentsApiResponse = await res.json();
    return data?.Departments?.data || [];
  } catch (err) {
    console.error("fetchDepartments error", err);
    // Fallback sample data for local development
    return [
      {
        id: "cmks7hgch0004p4cg9udk3u3p",
        name: "Department of Paediatrics",
        slug: "department-of-paediatrics",
        imageUrl: "https://cdn.mihs.edu.np/uploads/images/paediatrics-1769252878511.webp",
        description: "",
        services: ["Pediatric ICU", "Neonatal Care"],
      },
      {
        id: "cmks97rsw0005p4cgb8f5iupm",
        name: "Dermatology",
        slug: "dermatology",
        imageUrl: "https://cdn.mihs.edu.np/uploads/images/derma-1769255781532.webp",
        description: "",
        services: ["Advanced Skin Diagnostics"],
      },
      {
        id: "cmks9akur0006p4cgi441xpme",
        name: "Neurosurgery",
        slug: "neurosurgery",
        imageUrl: "https://cdn.mihs.edu.np/uploads/images/neuro-surgery-logo-1769255911985.webp",
        description: "",
        services: ["Brain Surgery"],
      },
    ];
  }
}

export async function fetchDepartmentBySlug(slug: string): Promise<DepartmentData | null> {
  try {
    const res = await fetch(`${API_BASE}/v1/department/fetch-department-by-slug/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    if (!res.ok) return null;
    const data: DepartmentApiResponse = await res.json();
    return data?.Department || null;
  } catch (err) {
    console.error("fetchDepartmentBySlug error", err);
    // Fallback to small local map for development so routes like /departments/dermatology work
    const fallback: Record<string, DepartmentData> = {
      "department-of-paediatrics": {
        id: "cmks7hgch0004p4cg9udk3u3p",
        name: "Department of Paediatrics",
        slug: "department-of-paediatrics",
        imageUrl: "https://cdn.mihs.edu.np/uploads/images/paediatrics-1769252878511.webp",
        description: "<p>Our Paediatrics department provides comprehensive medical care for infants, children, and adolescents.</p>",
        services: ["Pediatric ICU", "Neonatal Care", "Pediatric Surgery"],
      },
      "dermatology": {
        id: "cmks97rsw0005p4cgb8f5iupm",
        name: "Dermatology",
        slug: "dermatology",
        imageUrl: "https://cdn.mihs.edu.np/uploads/images/derma-1769255781532.webp",
        description: "<p>Our Dermatology department provides comprehensive care for skin, hair, and nail conditions.</p>",
        services: ["Advanced Skin Diagnostics", "Cosmetic Dermatology"],
      },
      "neurosurgery": {
        id: "cmks9akur0006p4cgi441xpme",
        name: "Neurosurgery",
        slug: "neurosurgery",
        imageUrl: "https://cdn.mihs.edu.np/uploads/images/neuro-surgery-logo-1769255911985.webp",
        description: "<p>Our Neurosurgery department specializes in surgical treatment of disorders affecting the nervous system.</p>",
        services: ["Brain Surgery", "Spinal Surgery"],
      },
    };

    return fallback[slug] || null;
  }
}
