
import { useState, useRef } from "react";
import { Testimonial } from "@/lib/psychometric-data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const isMobile = useIsMobile();
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleMouseEnter = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.play().catch(err => console.error("Error al reproducir video:", err));
      video.muted = false;
    }
  };
  
  const handleMouseLeave = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
    }
  };
  
  const wrapIndex = (index: number) => {
    return (index + testimonials.length) % testimonials.length;
  };

  return (
    <div className="animate-fade-in mt-8 w-full max-w-3xl mx-auto">
      <h3 className="text-base mb-6 text-center">Testimonios de Estudiantes</h3>
      
      <div className="relative">
        <div className="flex justify-center items-center">
          {/* Left Video */}
          {!isMobile && (
            <div 
              className="w-1/4 transition-all duration-300 opacity-60 transform scale-90 cursor-pointer"
              onClick={() => setActiveIndex(wrapIndex(activeIndex - 1))}
            >
              <div className="relative rounded-xl overflow-hidden shadow-notion">
                <video
                  ref={(el) => (videoRefs.current[testimonials[wrapIndex(activeIndex - 1)].id] = el)}
                  src={testimonials[wrapIndex(activeIndex - 1)].videoUrl}
                  poster={testimonials[wrapIndex(activeIndex - 1)].thumbnailUrl}
                  muted
                  playsInline
                  loop
                  className="w-full aspect-[9/16] object-cover"
                  onMouseEnter={() => handleMouseEnter(testimonials[wrapIndex(activeIndex - 1)].id)}
                  onMouseLeave={() => handleMouseLeave(testimonials[wrapIndex(activeIndex - 1)].id)}
                />
              </div>
            </div>
          )}
          
          {/* Center Video */}
          <div className="w-full sm:w-1/2 px-2 z-10">
            <div className="relative rounded-xl overflow-hidden shadow-notion">
              <video
                ref={(el) => (videoRefs.current[testimonials[activeIndex].id] = el)}
                src={testimonials[activeIndex].videoUrl}
                poster={testimonials[activeIndex].thumbnailUrl}
                muted
                playsInline
                loop
                className="w-full aspect-[9/16] object-cover"
                onMouseEnter={() => handleMouseEnter(testimonials[activeIndex].id)}
                onMouseLeave={() => handleMouseLeave(testimonials[activeIndex].id)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h4 className="text-white text-sm font-medium">{testimonials[activeIndex].name}</h4>
                <p className="text-white/80 text-xs">{testimonials[activeIndex].role}</p>
                <p className="text-white/90 text-xs mt-1">{testimonials[activeIndex].testimonial}</p>
              </div>
            </div>
          </div>
          
          {/* Right Video */}
          {!isMobile && (
            <div 
              className="w-1/4 transition-all duration-300 opacity-60 transform scale-90 cursor-pointer"
              onClick={() => setActiveIndex(wrapIndex(activeIndex + 1))}
            >
              <div className="relative rounded-xl overflow-hidden shadow-notion">
                <video
                  ref={(el) => (videoRefs.current[testimonials[wrapIndex(activeIndex + 1)].id] = el)}
                  src={testimonials[wrapIndex(activeIndex + 1)].videoUrl}
                  poster={testimonials[wrapIndex(activeIndex + 1)].thumbnailUrl}
                  muted
                  playsInline
                  loop
                  className="w-full aspect-[9/16] object-cover"
                  onMouseEnter={() => handleMouseEnter(testimonials[wrapIndex(activeIndex + 1)].id)}
                  onMouseLeave={() => handleMouseLeave(testimonials[wrapIndex(activeIndex + 1)].id)}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            onClick={handlePrev}
            className="bg-white/90 rounded-full p-2 shadow-notion focus:outline-none transform hover:scale-105 transition-transform"
          >
            <ChevronLeft size={16} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={handleNext}
            className="bg-white/90 rounded-full p-2 shadow-notion focus:outline-none transform hover:scale-105 transition-transform"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        
        {/* Dots indicator for mobile */}
        {isMobile && (
          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? "bg-notion-text" : "bg-notion-lightGray"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
