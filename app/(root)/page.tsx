import React from "react";
import Carousel from "../components/carousel/Carousel";

const items = [
  {
    image: "https://cdn.mihs.edu.np/uploads/images/cd2-1765121133884.jpg",
    title: "Modern Hospital Wing",
    description: "Comfortable spaces designed for patient recovery.",
  },
  {
    image: "https://cdn.mihs.edu.np/uploads/images/5th-sen-jpg-1765121337808-1765897454772.webp",
    title: "Caring Staff",
    description: "Dedicated professionals available 24/7.",
  },
  {
    image: "https://cdn.mihs.edu.np/uploads/images/wlc-1765121531631-1765897570990.webp",
    title: "Welcome and Farewell Program 2082",
    description: "State-of-the-art diagnostics and treatment.",
  },
    {
    image: "https://cdn.mihs.edu.np/uploads/images/1600x700-1765121816109-1765897496851.webp",
    title: "Advanced Equipment",
    description: "State-of-the-art diagnostics and treatment.",
  },
];

export default function Home() {
  return (
    <div>
      <Carousel items={items} interval={4500} height="70vh" gutterX={0} gutterY={0} />
    </div>
  );
}
