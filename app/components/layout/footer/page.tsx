"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Bell, FileText, Info, GraduationCap, ImageIcon, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react";
import "./footer.css";

// ============================================================================
// Types
// ============================================================================

interface QuickLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface ContactInfo {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

// ============================================================================
// Data
// ============================================================================

const quickLinks: QuickLink[] = [
  { label: "Home", href: "/", icon: <Home size={16} /> },
  { label: "Notices", href: "https://mihs.edu.np/notices?type=hospital-notice&page=1", icon: <Bell size={16} /> },
  { label: "IRC", href: "https://irc.mihs.edu.np", icon: <FileText size={16} /> },
];

const infoLinks: QuickLink[] = [
  { label: "JOURNAL", href: "https://journal.mihs.edu.np", icon: <Info size={16} /> },
  { label: "Academics", href: "https://mihs.edu.np/programs", icon: <GraduationCap size={16} /> },
  { label: "Gallery", href: "https://mihs.edu.np/gallery", icon: <ImageIcon size={16} /> },
];

const contactInfo: ContactInfo[] = [
  {
    label: "Our Campus",
    value: "Janakpurdham, Nepal",
    icon: <MapPin size={18} />,
  },
  {
    label: "Our Phone",
    value: "041-590867, 041-590868",
    icon: <Phone size={18} />,
  },
  {
    label: "Our Email",
    value: "mihs@mihs.edu.np",
    icon: <Mail size={18} />,
  },
];

const socialLinks: SocialLink[] = [
  { platform: "Facebook", url: "https://facebook.com", icon: <Facebook size={20} /> },
  { platform: "Twitter", url: "https://twitter.com", icon: <Twitter size={20} /> },
  { platform: "Instagram", url: "https://instagram.com", icon: <Instagram size={20} /> },
  { platform: "LinkedIn", url: "https://linkedin.com", icon: <Linkedin size={20} /> },
];

// ============================================================================
// Component
// ============================================================================

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - Logo & Description */}
        <div className="footer-section footer-brand">
          <Link href="/" className="footer-logo-link">
            <Image
              src="https://s3.ap-south-1.amazonaws.com/mihs.edu/uploads/images/ca6dd477-731e-4523-a8a9-5e3c9de34f80.png"
              alt="MIHS Logo"
              width={120}
              height={120}
              className="footer-logo"
            />
          </Link>
          <h3 className="footer-title">MIHS Provincial Hospital</h3>
          <p className="footer-location">Janakpurdham, Madhesh Province, Nepal</p>
          <p className="footer-description">
            Established in 2077, we have a long history of excellence and innovation in our field. 
            We aim to provide high-quality services to your community and beyond.
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <div className="footer-links-grid">
            {quickLinks.map((link) => (
              <Link key={link.label} href={link.href} className="footer-link">
                <span className="footer-link-icon">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
            {infoLinks.map((link) => (
              <Link key={link.label} href={link.href} className="footer-link">
                <span className="footer-link-icon">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section - Get in Touch */}
        <div className="footer-section">
          <h4 className="footer-heading">Get in Touch</h4>
          <div className="footer-contact">
            {contactInfo.map((info) => (
              <div key={info.label} className="contact-item">
                <div className="contact-icon">{info.icon}</div>
                <div className="contact-text">
                  <div className="contact-label">{info.label}</div>
                  <div className="contact-value">{info.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="footer-social">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={social.platform}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2026 Madhesh Institute of Health Sciences. All rights reserved.
        </p>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="scroll-top-btn"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  );
}
