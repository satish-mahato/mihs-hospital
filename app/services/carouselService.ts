// ============================================================================
// Carousel Service
// ============================================================================

import type { CarouselApiResponse, CarouselItem } from "@/types/carousel";

const API_URL = "https://api.mihs.edu.np/v1/carousel/fetch-all-carousels";
const REVALIDATE_TIME = 3600; // 1 hour

/**
 * Fetches carousel data from the API
 * @returns Array of carousel items or empty array on error
 */
export async function fetchCarousels(): Promise<CarouselItem[]> {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch carousels: ${response.status}`);
    }

    const data: CarouselApiResponse = await response.json();

    return data.Carousels.data.map((item) => ({
      image: item.imageUrl,
      title: item.title,
      description: item.description,
    }));
  } catch (error) {
    console.error("Error fetching carousels:", error);
    return [];
  }
}
