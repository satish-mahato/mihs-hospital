"use client";

import Link from "next/link";
import Image from "next/image";
import { Activity, Stethoscope, Heart, Brain, Baby, Eye, Bone, Syringe } from "lucide-react";
import { useEffect, useState } from "react";
import "./departments-dropdown.css";
import type { DepartmentData } from "@/types/department";
import { fetchDepartments } from "@/app/services/departmentService";

interface DepartmentsDropdownProps {
  mobile: boolean;
  closeMenu: () => void;
}

const ICONS = [Activity, Stethoscope, Heart, Brain, Baby, Eye, Bone, Syringe];

export default function DepartmentsDropdown({ mobile, closeMenu }: DepartmentsDropdownProps) {
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchDepartments();
        if (mounted) setDepartments(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={`departments-dropdown ${mobile ? "departments-dropdown-mobile" : "departments-dropdown-desktop"}`}>
      <div className="departments-grid">
        {loading && (
          <div className="px-4 py-6 text-sm text-gray-500">Loading departments...</div>
        )}

        {!loading && departments.length === 0 && (
          <div className="px-4 py-6 text-sm text-gray-500">No departments found.</div>
        )}

        {!loading && departments.map((dept, idx) => {
          const Icon = ICONS[idx % ICONS.length];
          return (
            <Link
              key={dept.slug}
              href={`/departments/${dept.slug}`}
              className="department-item"
              onClick={closeMenu}
            >
              <span className="department-icon">
                {dept.imageUrl ? (
                  <Image
                    src={dept.imageUrl}
                    alt={dept.name}
                    width={40}
                    height={40}
                    className="department-icon-img"
                  />
                ) : (
                  <Icon size={18} />
                )}
              </span>
              <span className="department-name">{dept.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
