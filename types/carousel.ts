// ============================================================================
// Carousel Types
// ============================================================================

export interface CarouselData {
  id: string;
  title: string;
  description: string;
  imageKey: string;
  order: number;
  imageUrl: string;
}

export interface CarouselItem {
  image: string;
  title: string;
  description: string;
}

export interface CarouselApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  Carousels: {
    data: CarouselData[];
    pagination: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
      pageSize: number;
    };
  };
}
