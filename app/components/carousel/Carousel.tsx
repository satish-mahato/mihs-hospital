"use client";
import React, { useEffect, useRef, useState } from "react";
import "./carousel.css";

export interface CarouselItem {
  image: string;
  title: string;
  description?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  interval?: number;
}

interface CarouselPropsWithHeight extends CarouselProps {
  /** CSS height like '400px' or '60vh' or number (px) */
  height?: string | number;
  /** horizontal gutter (space from left/right) as CSS value or number(px) */
  gutterX?: string | number;
  /** vertical gutter (space from top/bottom) as CSS value or number(px) */
  gutterY?: string | number;
}

export default function Carousel({ items, interval = 4000, height = "65vh", gutterX = 16, gutterY = 16, }: CarouselPropsWithHeight) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    timeoutRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, interval);
    return () => {
      if (timeoutRef.current) window.clearInterval(timeoutRef.current);
    };
  }, [items.length, interval, paused]);

  function goTo(i: number) {
    setIndex((i + items.length) % items.length);
  }

  function handlePrev() {
    goTo(index - 1);
  }
  function handleNext() {
    goTo(index + 1);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) handleNext(); else handlePrev();
    }
    touchStartX.current = null;
    setPaused(false);
  }

  const gx = typeof gutterX === "number" ? `${gutterX}px` : gutterX;
  const gy = typeof gutterY === "number" ? `${gutterY}px` : gutterY;

  const containerStyle: React.CSSProperties = {
    margin: gutterX === 0 && gutterY === 0 ? 0 : `${gy} ${gx}`,
    width: gutterX === 0 ? "100%" : `calc(100% - ${gx} - ${gx})`,
    boxSizing: "border-box",
  };

  return (
    <div
      className="carousel"
      style={containerStyle}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {items.map((it, idx) => {
          const computedHeight = typeof height === "number" ? `${height}px` : height;
          return (
            <div
              className="carousel-slide"
              key={idx}
              aria-hidden={idx !== index}
              style={{ height: computedHeight }}
            >
              <img src={it.image} alt={it.title} className="carousel-image" />
              <div className="carousel-overlay">
                <h3 className="carousel-title">{it.title}</h3>
                {it.description && <p className="carousel-desc">{it.description}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <button className="carousel-btn prev" onClick={handlePrev} aria-label="Previous">
        ‹
      </button>
      <button className="carousel-btn next" onClick={handleNext} aria-label="Next">
        ›
      </button>

      <div className="carousel-dots">
        {items.map((_, i) => (
          <button
            key={i}
            className={"dot" + (i === index ? " active" : "")}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
