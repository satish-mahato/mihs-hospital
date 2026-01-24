"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./carousel.css";

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface CarouselItem {
  image: string;
  title: string;
  description?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  interval?: number;
  height?: string | number;
  gutterX?: string | number;
  gutterY?: string | number;
}

// ============================================================================
// Component
// ============================================================================

export default function Carousel({
  items,
  interval = 4000,
  height = "65vh",
  gutterX = 16,
  gutterY = 16,
}: CarouselProps) {
  // State
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));

  // Refs
  const timeoutRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // ============================================================================
  // Effects
  // ============================================================================

  // Preload adjacent images for smooth transitions
  useEffect(() => {
    if (!items || items.length === 0) return;
    const prevIndex = (index - 1 + items.length) % items.length;
    const nextIndex = (index + 1) % items.length;
    setLoadedImages((prev) => new Set([...prev, index, prevIndex, nextIndex]));
  }, [index, items?.length]);

  // Auto-advance carousel
  useEffect(() => {
    if (paused || !items || items.length <= 1) return;

    timeoutRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, interval);

    return () => {
      if (timeoutRef.current) window.clearInterval(timeoutRef.current);
    };
  }, [items?.length, interval, paused]);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("keydown", handleKeyDown);
      return () => carousel.removeEventListener("keydown", handleKeyDown);
    }
  }, [index]);

  // ============================================================================
  // Handlers
  // ============================================================================

  const goTo = (i: number) => {
    if (!items || items.length === 0) return;
    setIndex((i + items.length) % items.length);
  };

  const handlePrev = () => goTo(index - 1);
  const handleNext = () => goTo(index + 1);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const swipeThreshold = 40;

    if (Math.abs(dx) > swipeThreshold) {
      dx < 0 ? handleNext() : handlePrev();
    }

    touchStartX.current = null;
    setPaused(false);
  };

  // ============================================================================
  // Computed Values
  // ============================================================================

  if (!items || items.length === 0) {
    return null;
  }

  const gx = typeof gutterX === "number" ? `${gutterX}px` : gutterX;
  const gy = typeof gutterY === "number" ? `${gutterY}px` : gutterY;

  const containerStyle: React.CSSProperties = {
    margin: gutterX === 0 && gutterY === 0 ? 0 : `${gy} ${gx}`,
    width: gutterX === 0 ? "100%" : `calc(100% - ${gx} - ${gx})`,
    boxSizing: "border-box",
  };

  const trackStyle: React.CSSProperties = {
    transform: `translateX(-${index * 100}%)`,
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div
      ref={carouselRef}
      className="carousel"
      style={containerStyle}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      role="region"
      aria-label="Image carousel"
      aria-live="polite"
    >
      {/* Slides Track */}
      <div className="carousel-track" style={trackStyle}>
        {items.map((item, idx) => {
          const computedHeight = typeof height === "number" ? `${height}px` : height;
          const shouldLoad = loadedImages.has(idx);

          return (
            <div
              key={idx}
              className="carousel-slide"
              aria-hidden={idx !== index}
              style={{ height: computedHeight }}
            >
              {/* Image - Lazy loaded with Next.js optimization */}
              {shouldLoad ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="carousel-image"
                  style={{ objectFit: "cover" }}
                  sizes="100vw"
                  priority={idx === 0}
                  quality={85}
                />
              ) : (
                <div className="carousel-image" style={{ background: "#111" }} />
              )}

              {/* Overlay with title and description */}
              <div className="carousel-overlay">
                <h3 className="carousel-title ">{item.title}</h3>
                {item.description && <p className="carousel-desc ">{item.description}</p>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <button
        type="button"
        className="carousel-btn prev"
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        ‹
      </button>

      <button
        type="button"
        className="carousel-btn next"
        onClick={handleNext}
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Dot Indicators */}
      <div className="carousel-dots">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`dot${i === index ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
}
