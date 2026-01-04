"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { CompanyType } from "@/types/company";
import { SocialType } from "@/types/socials";
import { TeamMember } from "@/types/team";
import {
  Home,
  Info,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Bell,
  Image as ImageIcon,
  ArrowUp,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";


const STATIC_SOCIALS: SocialType[] = [
  { id: "facebook", platform: "facebook", url: "https://facebook.com" } as any,
  { id: "twitter", platform: "twitter", url: "https://twitter.com" } as any,
  { id: "instagram", platform: "instagram", url: "https://instagram.com" } as any,
  { id: "linkedin", platform: "linkedin", url: "https://linkedin.com" } as any,
];

const STATIC_COMPANY: CompanyType = {
  siteName: "Madhesh Institute of Health Sciences",
  address: "Janakpurdham, Madhesh Province, Nepal",
  siteDescription:
    "Established in 2077, we have a long history of excellence and innovation in our field.",
  logoUrllink: "https://cdn.mihs.edu.np/uploads/images/ca6dd477-731e-4523-a8a9-5e3c9de34f80.png",
  phoneNumber: "041-590867",
  contactEmail: "mihs@mihs.edu.np",
} as any;

const STATIC_TEAM_MEMBER: TeamMember = ({
  name: "डा. राम ज्ञान यादव",
  position: "Informational Officer",
  bio: "प्रवक्ता / सूचना अधिकारी",
  email: "yadav.ramgyan@mihs.edu.np",
} as unknown) as TeamMember;

export default function Footer() {
  const [socialLinks] = useState<SocialType[]>(STATIC_SOCIALS);
  const [company] = useState<CompanyType | undefined>(STATIC_COMPANY);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [order10TeamMember] = useState<TeamMember | null>(STATIC_TEAM_MEMBER as any);

  // Handle scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 300); // Show button after scrolling 300px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getSocialIcon = useCallback((social: SocialType) => {
    // Use the actual uploaded icon if available
    if (social.iconUrl && social.iconUrl.startsWith("http")) {
      return (
        <Image
          src={social.iconUrl}
          alt={social.platform}
          width={24}
          height={24}
          className="w-6 h-6 object-contain"
        />
      );
    } else if (social.iconUrllink && social.iconUrllink.startsWith("http")) {
      return (
        <Image
          src={social.iconUrllink}
          alt={social.platform}
          width={24}
          height={24}
          className="w-6 h-6 object-contain"
        />
      );
    }

    // Fallback to Lucide icons if no uploaded icon
    const platformLower = social.platform.toLowerCase();
    switch (platformLower) {
      case "facebook":
        return (
          <Facebook className="text-blue-500 group-hover:text-white text-lg transition-colors duration-200" />
        );
      case "twitter":
        return (
          <Twitter className="text-blue-500 group-hover:text-white text-lg transition-colors duration-200" />
        );
      case "instagram":
        return (
          <Instagram className="text-blue-500 group-hover:text-white text-lg transition-colors duration-200" />
        );
      case "linkedin":
        return (
          <Linkedin className="text-blue-500 group-hover:text-white text-lg transition-colors duration-200" />
        );
      default:
        return (
          <div className="w-6 h-6 bg-blue-500 group-hover:bg-white rounded" />
        );
    }
  }, []);

  return (
    <footer className="bg-gradient-to-b from-blue-100 to-blue-200 relative pt-12">
      {/* Wave SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0">
        <svg
          className="relative block h-16 w-full"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#BFDBFE"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,106.7C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          {/* Logo Section */}
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative group">
                <Link href="/" onClick={scrollToTop}>
                  <Image
                    src={company?.logoUrllink || "/logo/logo.webp"}
                    alt="Logo"
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-xl transform transition duration-500 group-hover:scale-105 group-hover:rotate-3"
                  />
                </Link>
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping group-hover:animate-none"></div>
              </div>
              <h2 className="text-xl font-bold text-blue-900 mt-4 mb-2 tracking-wide">
                {company?.siteName || "Madhesh Institute of Health Sciences"}
              </h2>
              <p className="text-sm text-blue-700 font-medium">
                {company?.address || "Janakpurdham, Madhesh Province, Nepal"}
              </p>
            </div>
            <p className="mt-4 text-blue-800 leading-relaxed text-sm sm:text-base max-w-xs mx-auto lg:mx-0">
              {company?.siteDescription ||
                "Established in 2077, we have a long history of excellence and innovation in our field. We aim to provide high-quality services to your community and beyond."}
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="w-full lg:w-1/3 text-center">
            <h2 className="text-xl font-bold text-blue-900 mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-blue-400 after:rounded-full">
              Quick Links
            </h2>
            <ul className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { name: "Home", href: "/", icon: Home },
                {
                  name: "Old Website",
                  href: "https://old.mihs.edu.np",
                  icon: Info,
                },
                { name: "Notices", href: "/notices", icon: Bell },
                { name: "Programs", href: "/programs", icon: GraduationCap },
                { name: "Contact", href: "/contact", icon: Phone },
                { name: "Gallery", href: "/gallery", icon: ImageIcon },
              ].map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <Link
                    href={href}
                    onClick={scrollToTop}
                    className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-white/70 hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md text-blue-900 hover:text-blue-700"
                  >
                    <Icon className="text-blue-500 text-lg hover:text-blue-600 transition-colors duration-200" />
                    <span className="font-medium text-sm">{name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Team Member Section */}
            <div className="mt-6 bg-white/70 p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 justify-center w-fit mx-auto">
                {/* Team Member Image */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-blue-200 shadow-sm">
                    {order10TeamMember ? (
                      <Image
                        src={
                          order10TeamMember.imageUrl &&
                          order10TeamMember.imageUrl.startsWith("http")
                            ? order10TeamMember.imageUrl
                            : (order10TeamMember as any).imageurl &&
                              (order10TeamMember as any).imageurl.startsWith(
                                "http"
                              )
                            ? (order10TeamMember as any).imageurl
                            : "/placeholder.jpg"
                        }
                        alt={order10TeamMember.name || "Team member"}
                        width={96}
                        height={96}
                        className="w-full h-full object-contain object-center"
                      />
                    ) : (
                      <Image
                        src="/logo/logo.webp"
                        alt="Quality Accreditation Badge"
                        width={112}
                        height={112}
                        className="w-full h-full object-contain object-center"
                      />
                    )}
                  </div>
                </div>

                {/* Team Member Info */}
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  {order10TeamMember ? (
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-blue-800 mb-1">
                        {order10TeamMember.position}
                      </h3>
                      <p className="text-blue-700 font-bold text-sm sm:text-base mb-2">
                        {order10TeamMember.name}
                      </p>
                      <p className="text-xs text-blue-600 mb-2 leading-relaxed line-clamp-3 sm:line-clamp-none">
                        {order10TeamMember.bio}
                      </p>
                      <Link
                        href={
                          order10TeamMember.email
                            ? `mailto:${order10TeamMember.email}`
                            : "mailto:"
                        }
                        className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        style={{ wordBreak: "break-all" }}
                      >
                        <Mail className="text-blue-500 w-3 h-3 flex-shrink-0" />
                        <span>{order10TeamMember.email || ""}</span>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-blue-800 mb-1">
                        Informational Officer
                      </h3>
                      <p className="text-blue-700 font-bold text-sm sm:text-base mb-2">
                        डा. राम ज्ञान यादव
                      </p>
                      <p className="text-xs text-blue-600 mb-2 leading-relaxed">
                        प्रवक्ता / सूचना अधिकारी
                      </p>
                      <Link
                        href="mailto:yadav.ramgyan@mihs.edu.np"
                        className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        style={{ wordBreak: "break-all" }}
                      >
                        <Mail className="text-blue-500 w-3 h-3 flex-shrink-0" />
                        <span>yadav.ramgyan@mihs.edu.np</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <h2 className="text-xl font-bold text-blue-900 mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 lg:after:left-0 after:-translate-x-1/2 lg:after:translate-x-0 after:w-16 after:h-1 after:bg-blue-400 after:rounded-full">
              Get in Touch
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col items-center lg:items-start space-y-3">
                <div className="flex items-center space-x-3 bg-white/70 p-3 rounded-lg w-full max-w-xs shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="p-2 bg-blue-500 rounded-md shadow-sm">
                    <MapPin className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900 text-sm">
                      Our Campus
                    </p>
                    <p className="text-xs text-blue-700">
                      {company?.address || "Janakpurdham, Nepal"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/70 p-3 rounded-lg w-full max-w-xs shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="p-2 bg-blue-500 rounded-md shadow-sm">
                    <Phone className="text-white text-lg" />
                  </div>
                  <Link
                    href={`tel:${company?.phoneNumber || "041-590867"}`}
                    className="hover:text-blue-700 transition-colors text-blue-900"
                  >
                    <p className="font-semibold text-blue-900 text-sm">
                      Our Phone
                    </p>
                    <span className="text-xs text-blue-700">
                      {company?.phoneNumber || "041-590867, 041-590868"}
                    </span>
                  </Link>
                </div>
                <div className="flex items-center space-x-3 bg-white/70 p-3 rounded-lg w-full max-w-xs shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="p-2 bg-blue-500 rounded-md shadow-sm">
                    <Mail className="text-white text-lg" />
                  </div>
                  <Link
                    href={`mailto:${
                      company?.contactEmail || "mihs@mihs.edu.np"
                    }`}
                    className="hover:text-blue-700 transition-colors text-blue-900"
                  >
                    <p className="font-semibold text-blue-900 text-sm">
                      Our Email
                    </p>
                    <span className="text-xs text-blue-500">
                      {company?.contactEmail ||
                        "mihs@mihs.edu.np, info@mihs.edu.np"}
                    </span>
                  </Link>
                </div>
              </div>
              <div className="pt-4 flex justify-center lg:justify-start space-x-4">
                {Array.isArray(socialLinks) && socialLinks.length > 0
                  ? socialLinks.map((social) => (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-white hover:bg-blue-500 transition-all duration-200 shadow-sm hover:shadow-md group w-12 h-12 flex items-center justify-center"
                        aria-label={`Follow us on ${social.platform}`}
                      >
                        {getSocialIcon(social)}
                      </a>
                    ))
                  : // Fallback social icons if no social links are fetched
                    [
                      {
                        platform: "facebook",
                        url: "https://facebook.com",
                        icon: Facebook,
                      },
                      {
                        platform: "twitter",
                        url: "https://twitter.com",
                        icon: Twitter,
                      },
                      {
                        platform: "instagram",
                        url: "https://instagram.com",
                        icon: Instagram,
                      },
                      {
                        platform: "linkedin",
                        url: "https://linkedin.com",
                        icon: Linkedin,
                      },
                    ].map(({ platform, url, icon: Icon }) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-white hover:bg-blue-500 transition-all duration-200 shadow-sm hover:shadow-md group w-12 h-12 flex items-center justify-center"
                        aria-label={`Follow us on ${platform}`}
                      >
                        <Icon className="text-blue-500 group-hover:text-white text-lg transition-colors duration-200" />
                      </a>
                    ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-300/50 mt-8 pt-6">
          <p className="text-center text-xs sm:text-sm text-blue-700 font-medium">
            &copy; {new Date().getFullYear()}{" "}
            {company?.siteName || "Madhesh Institute of Health Sciences"}.
            <br className="sm:hidden" /> All rights reserved.
          </p>
        </div>
      </div>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all z-50 animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="text-lg" />
        </button>
      )}
    </footer>
  );
}
