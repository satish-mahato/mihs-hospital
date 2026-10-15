// ============================================================================
// Department Types
// ============================================================================

export interface DepartmentMember {
  id: string;
  slug: string;
  name: string;
  position: string;
  image: string;      // raw S3 key
  imageUrl: string;   // full URL — use for <img src>
  bio: string;
  email: string;
  phone: string;
  departmentId: string;
  order: number;
}

export interface DepartmentData {
  id: string;
  name: string;
  slug: string;
  imageKey?: string;
  imageUrl?: string;  // full URL — use for <img src>
  order?: number;
  description?: string;
  services?: string[];
  departmentMembers?: DepartmentMember[];
}

export interface DepartmentsApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  Departments: {
    data: DepartmentData[];
    pagination?: {
      totalItems?: number;
      currentPage?: number;
      totalPages?: number;
    };
  };
}

export interface DepartmentApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  Department: DepartmentData;
}
