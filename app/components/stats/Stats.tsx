"use client";

import React, { useEffect, useState } from "react";
import "./stats.css";
import { fetchHospitalStats } from "@/app/services/statsService";
import type { HospitalStats } from "@/types/stats";

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

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BedIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 4v16" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 8h18a2 2 0 0 1 2 2v10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 17h20" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 8V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ActivityIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ============================================================================
// Component
// ============================================================================

export default function Stats() {
  const [stats, setStats] = useState<HospitalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await fetchHospitalStats();
        setStats(data);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
    
    // Refresh data every 30 seconds
    const interval = setInterval(loadStats, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Create dynamic stats data based on API response
  const createStatsData = (hospitalStats: HospitalStats): StatItem[] => [
    {
      id: "total",
      value: hospitalStats.total,
      label: "Total Patients Today",
      subtitle: `OPD ${hospitalStats.opd} • Emergency ${hospitalStats.totalEmergency} • Admitted ${hospitalStats.totalAdmit}`,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      icon: <UsersIcon />,
    },
    {
      id: "opd",
      value: hospitalStats.opd,
      label: "OPD Patients",
      subtitle: `New ${hospitalStats.new} • Old ${hospitalStats.old}`,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      icon: <ClipboardIcon />,
    },
    {
      id: "emergency",
      value: hospitalStats.totalEmergency,
      label: "Emergency Patients",
      subtitle: `Regular ${hospitalStats.emergency} • BIMA ${hospitalStats.emerBima}`,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      icon: <AmbulanceIcon />,
    },
    {
      id: "admitted",
      value: hospitalStats.totalAdmit,
      label: "Admitted Patients",
      subtitle: `Regular ${hospitalStats.admit} • BIMA ${hospitalStats.admitBima}`,
      gradient: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
      icon: <BedIcon />,
    },
    {
      id: "insurance",
      value: hospitalStats.totalBima,
      label: "Life Insurance",
      subtitle: `OPD ${hospitalStats.bima} • Emergency ${hospitalStats.emerBima} • Admitted ${hospitalStats.admitBima}`,
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      icon: <ShieldIcon />,
    },
    
  ];

  const statsData = stats ? createStatsData(stats) : [];

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-header">
          <h2 className="stats-title">Service/Patient Statistics</h2>
          <div className="stats-header-right">
            <span className="live-badge">
              <span className="pulse-dot"></span>
              Live
            </span>
            {lastUpdated && (
              <span className="last-updated">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        {loading ? (
          <div className="stats-loading">
            <div className="loading-spinner"></div>
            <p>Loading live statistics...</p>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}
