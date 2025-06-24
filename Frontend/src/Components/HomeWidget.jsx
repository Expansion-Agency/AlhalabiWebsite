import React, { useEffect, useRef, useState } from "react";
import "./homewidget.css"; // Ensure you have the CSS file for styling
import { useTranslation } from "react-i18next";

const slides = [
  {
    id: 1,
    image: "/assets/IMG_1078.JPG",
    title: "Secure Products",
  },
  {
    id: 2,
    image: "/assets/IMG_1067.JPG", // Replace with your second image
    title: "Smart Solutions",
  },
  {
    id: 3,
    image: "/assets/IMG_1078.JPG",
    title: "Secure Products",
  },
  {
    id: 4,
    image: "/assets/IMG_1067.JPG", // Replace with your second image
    title: "Smart Solutions",
  },
];
const extendedSlides = slides;

function HomeWidget() {
  const { t, direction } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="slider-container max-h-fit">
      <div
        ref={sliderRef}
        className="slider max-h-1/2 lg:max-h-screen"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: isTransitioning ? "transform 1s ease-in-out" : "none",
        }}
      >
        {extendedSlides.map((slide, index) => (
          <div className="slide" key={`${slide.id}-${index}`}>
            <img
              className="lg:max-h-screen w-full object-cover"
              src={slide.image}
              alt={slide.title}
            />
            <div className="slide-caption">
              <h2>{slide.title}</h2>
            </div>
          </div>
        ))}
      </div>
      {/* Arrows */}
      <button className="nav-button prev" onClick={goToPrevSlide}>
        &#10094;
      </button>
      <button className="nav-button next" onClick={goToNextSlide}>
        &#10095;
      </button>
    </div>
  );
}

export default HomeWidget;
