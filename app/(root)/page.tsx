// ============================================================================
// Home Page
// ============================================================================

import Carousel from "../components/carousel/Carousel";
import Stats from "../components/stats/Stats";
import DepartmentsSection from "../components/departments/DepartmentsSection";
import { fetchCarousels } from "../services/carouselService";

export default async function Home() {
  const carouselItems = await fetchCarousels();

  return (
    <main>
      {/* Hero Carousel */}
      {carouselItems.length > 0 ? (
        <Carousel
          items={carouselItems}
          interval={4500}
          height="70vh"
          gutterX={0}
          gutterY={0}
        />
      ) : (
        <div className="flex items-center justify-center h-[70vh] bg-gray-100">
          <p className="text-gray-500">No carousel items available.</p>
        </div>
      )}
         {/* Patient Statistics */}
      <Stats />

      {/* Departments preview */}
      <DepartmentsSection />

   
    </main>
  );
}
