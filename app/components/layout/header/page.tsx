"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, Bell, Building2, ChevronDown, Menu, X, Mail, Phone } from "lucide-react";
import DepartmentsDropdown from "./DepartmentsDropdown";
import "./header.css";

// ============================================================================
// Component
// ============================================================================

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const departmentsDropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeAll = () => {
    setMenuOpen(false);
    setIsDepartmentsOpen(false);
  };

  // Set header height CSS variable
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        document.documentElement.style.setProperty(
          "--header-height",
          `${entry.contentRect.height}px`
        );
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check mobile view
  useEffect(() => {
    const checkMobile = () => setMobileView(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeAll();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHover = (open: boolean, event?: React.MouseEvent) => {
    if (!mobileView) {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
      const relatedTarget = event?.relatedTarget as Node;
      const currentDropdown = departmentsDropdownRef.current;

      if (open || (currentDropdown && currentDropdown.contains(relatedTarget))) {
        if (open) setIsDepartmentsOpen(true);
      } else {
        hoverTimeout.current = setTimeout(() => {
          setIsDepartmentsOpen(false);
        }, 300);
      }
    }
  };

  return (
    <header
      ref={headerRef}
      className="header"
    >
      {/* Top Bar */}
      <div
        className={`header-topbar ${
          isScrolled ? "header-topbar-hidden" : "header-topbar-visible"
        }`}
      >
        <div className="header-topbar-container">
          <a href="mailto:mihs@mihs.edu.np" className="header-topbar-link">
            <Mail size={14} />
            <span>mihs@mihs.edu.np</span>
          </a>
          <a href="tel:041-590867" className="header-topbar-link">
            <Phone size={14} />
            <span>041-590867, 041-590868</span>
          </a>
        </div>
      </div>

      {/* Main Header */}
      <div
        className={`header-main ${
          isScrolled ? "header-main-scrolled" : "header-main-normal"
        }`}
      >
        <Link href="/" onClick={closeAll} className="header-brand">
          <Image
            src="https://s3.ap-south-1.amazonaws.com/mihs.edu/uploads/images/ca6dd477-731e-4523-a8a9-5e3c9de34f80.png"
            alt="MIHS Logo"
            width={96}
            height={96}
            className={`header-logo ${
              isScrolled ? "header-logo-small" : "header-logo-normal"
            }`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/logo.png";
            }}
          />
          <div className="header-brand-text">
            <h1
              className={`header-title ${
                isScrolled ? "header-title-small" : "header-title-normal"
              }`}
            >
              MIHS Provincial Hospital
            </h1>
            <p
              className={`header-subtitle ${
                isScrolled ? "header-subtitle-small" : "header-subtitle-normal"
              }`}
            >
              Janakpurdham, Madhesh Province, Nepal
            </p>
          </div>
        </Link>

        <button className="header-menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav
          ref={menuRef}
          className={`header-nav ${
            menuOpen ? "header-nav-open" : "header-nav-closed"
          }`}
        >
          <div className="header-nav-container">
            <button className="header-nav-close" onClick={toggleMenu}>
              <X size={28} />
            </button>

            <div className="header-nav-links">
              {/* Notices Link */}
              <Link href="https://mihs.edu.np/notices?type=hospital-notice&page=1" className="header-nav-link" onClick={closeAll}>
                <Bell size={20} />
                <span>Notices</span>
              </Link>

              {/* Departments Dropdown */}
              <div
                className="header-dropdown"
                ref={departmentsDropdownRef}
                onMouseEnter={(e) => handleHover(true, e)}
                onMouseLeave={(e) => handleHover(false, e)}
              >
                <button
                  className="header-nav-link"
                  onClick={() =>
                    mobileView && setIsDepartmentsOpen(!isDepartmentsOpen)
                  }
                >
                  <Building2 size={20} />
                  <span>Departments</span>
                  <ChevronDown
                    size={14}
                    className={`header-dropdown-icon ${
                      isDepartmentsOpen ? "header-dropdown-icon-open" : ""
                    }`}
                  />
                </button>
                {isDepartmentsOpen && (
                  <DepartmentsDropdown mobile={mobileView} closeMenu={closeAll} />
                )}
              </div>

              {/* MIHS Link */}
              <Link
                href="https://mihs.edu.np"
                className="header-nav-link"
                onClick={closeAll}
                target="_blank"
              >
                <Home size={20} />
                <span>MIHS</span>
              </Link>
            </div>

            {/* Mobile Social Links */}
            <div className="header-social">
              <a
                href="https://www.facebook.com/profile.php?id=100075611130871"
                target="_blank"
                rel="noopener noreferrer"
                className="header-social-link"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="header-social-link"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
