// ============================================================================
// Department Types
// ============================================================================

export interface DepartmentData {
  id: string;
  name: string;
  slug: string;
  imageKey?: string;
  order?: number;
  description?: string;
  services?: string[];
  imageUrl?: string;
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
