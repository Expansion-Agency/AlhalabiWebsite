import React, { useEffect, useRef, useState } from "react";
import "./HomeWidget.css"; // Ensure you have the CSS file for styling
import { useTranslation } from "../../TranslationContext";

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
];
const extendedSlides = slides.length > 1 ? [...slides, slides[0]] : slides;

function HomeWidget() {
  const { t, direction } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (slides.length > 1 && currentSlide === slides.length) {
      // Wait until the transition ends
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, 1000); // Should match your CSS transition duration (1s)

      return () => clearTimeout(timeout);
    }
  }, [currentSlide]);

  const goToNextSlide = () => {
    if (slides.length <= 1) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  const goToPrevSlide = () => {
    if (slides.length <= 1) return;

    setIsTransitioning(true);

    if (currentSlide === 0) {
      // Jump to cloned slide at end instantly (no animation)
      setIsTransitioning(false);
      setCurrentSlide(slides.length);
      // After jump, go back one slide
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentSlide(slides.length - 1);
      }, 50);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
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
