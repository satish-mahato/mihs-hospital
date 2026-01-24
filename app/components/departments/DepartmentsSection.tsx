import Link from "next/link";
import Image from "next/image";
import "./departments.css";
import { fetchDepartments } from "@/app/services/departmentService";
import type { DepartmentData } from "@/types/department";

export default async function DepartmentsSection() {
  const departments: DepartmentData[] = await fetchDepartments();

  if (!departments || departments.length === 0) {
    return null;
  }

  return (
    <section className="departments-section py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="section-title">Our Departments</h2>
          <div className="section-underline" />
        </div>

        <div className="departments-grid">
          {departments.map((d) => (
            <Link key={d.slug} href={`/departments/${d.slug}`} className="dept-card">
              <div className="dept-image-wrap">
                {d.imageUrl ? (
                  <Image src={d.imageUrl} alt={d.name} width={240} height={140} className="dept-image" />
                ) : (
                  <div className="dept-image-placeholder" />
                )}
              </div>
              <div className="dept-title">{d.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
