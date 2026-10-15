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

          {/* Department Members */}
          {department.departmentMembers && department.departmentMembers.length > 0 && (
            <div className="department-members">
              <h2 className="section-heading">Meet Our Team</h2>
              <div className="members-grid">
                {department.departmentMembers.map((member) => (
                  <div key={member.id} className="member-card">
                    <div className="member-photo-wrap">
                      {member.imageUrl ? (
                        <Image
                          src={member.imageUrl}
                          alt={member.name}
                          width={120}
                          height={120}
                          className="member-photo"
                        />
                      ) : (
                        <div className="member-photo-placeholder">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="member-info">
                      <h3 className="member-name">{member.name}</h3>
                      <p className="member-position">{member.position}</p>
                      {member.bio && <p className="member-bio">{member.bio}</p>}
                      <div className="member-contacts">
                        {member.email && (
                          <a href={`mailto:${member.email}`} className="member-contact-link">
                            ✉ {member.email}
                          </a>
                        )}
                        {member.phone && (
                          <a href={`tel:${member.phone}`} className="member-contact-link">
                            ☎ {member.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
