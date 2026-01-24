import Image from "next/image";
import Link from "next/link";
import { fetchDepartmentBySlug } from "@/app/services/departmentService";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import "./department.css";

type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export default async function DepartmentPage({ params }: Props) {
  const { slug } = (await params) as { slug: string };
  const department = await fetchDepartmentBySlug(slug);

  if (!department) {
    return (
      <div className="department-not-found">
        <h2>Department not found</h2>
        <p>No department matches "{slug}".</p>
        <Link href="/" className="back-link">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="department-page">
      <div className="department-header">
        <Link href="/" className="back-link">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
        <h1 className="department-title">{department.name}</h1>
        <div className="title-underline" />
      </div>

      <div className="department-content">
        <div className="department-main">
          {department.imageUrl && (
            <div className="department-hero-image">
              <Image
                src={department.imageUrl}
                alt={department.name}
                width={1200}
                height={500}
                className="hero-img"
                priority
              />
            </div>
          )}

          <div className="department-description">
            <h2 className="section-heading">About This Department</h2>
            <div
              className="description-content"
              dangerouslySetInnerHTML={{ __html: department.description || "<p>No description available.</p>" }}
            />
          </div>
        </div>

        <aside className="department-sidebar">
          <div className="services-card">
            <h3 className="services-title">Our Services</h3>
            {department.services && department.services.length > 0 ? (
              <ul className="services-list">
                {department.services.map((service) => (
                  <li key={service} className="service-item">
                    <CheckCircle2 size={20} className="service-icon" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-services">No services listed.</p>
            )}
          </div>

          <div className="contact-card">
            <h3 className="contact-title">Get in Touch</h3>
            <p className="contact-text">
              For appointments or inquiries about this department, please contact our main reception.
            </p>
            <a href="tel:041-590867" className="contact-button">
              Call: 041-590867
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}
