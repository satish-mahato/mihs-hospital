"use client";

import React from "react";
import "./stats.css";

// ============================================================================
// Types
// ============================================================================

interface StatItem {
  id: string;
  value: number;
  label: string;
  subtitle?: string;
  gradient: string;
  icon: React.ReactNode;
}

// ============================================================================
// Icons
// ============================================================================

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AmbulanceIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 3h5v5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 3H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 17h4a1 1 0 0 0 1-1V9l-3-5h-2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
    <path d="M9 17h6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 5v4M11 7h4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ClipboardIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ============================================================================
// Data
// ============================================================================

const statsData: StatItem[] = [
  {
    id: "total",
    value: 467,
    label: "Total Patients Today",
    subtitle: "OPD 444 • Emergency 12 • Admitted 11",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    icon: <UsersIcon />,
  },
  {
    id: "emergency",
    value: 12,
    label: "Emergency Patients",
    subtitle: "Male 5 • Female 7",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    icon: <AmbulanceIcon />,
  },
  {
    id: "opd",
    value: 444,
    label: "OPD Patients",
    subtitle: "Male 179 • Female 265",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    icon: <ClipboardIcon />,
  },
  {
    id: "insurance",
    value: 168,
    label: "Health Insurance Program",
    subtitle: "Active enrollments",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    icon: <ShieldIcon />,
  },
];

// ============================================================================
// Component
// ============================================================================

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-header">
          <h2 className="stats-title">Service/Patient Statistics</h2>
          <span className="live-badge">
            <span className="pulse-dot"></span>
            Live
          </span>
        </div>

        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div
              key={stat.id}
              className="stat-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="stat-icon-wrapper" style={{ background: stat.gradient }}>
                <div className="stat-icon">{stat.icon}</div>
              </div>

              <div className="stat-content">
                <div className="stat-value">{stat.value.toLocaleString()}</div>
                <div className="stat-label">{stat.label}</div>
                {stat.subtitle && <div className="stat-subtitle">{stat.subtitle}</div>}
              </div>

              <div className="stat-bg-gradient" style={{ background: stat.gradient }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
