
import { useState, useRef, useEffect } from "react";
import { Testimonial } from "@/lib/psychometric-data";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState("");
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const isMobile = useIsMobile();
  const autoRotateInterval = useRef<number | null>(null);
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleThumbnailClick = (videoUrl: string) => {
    // Extract YouTube video ID from the URL
    const videoId = videoUrl.split("/").pop();
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    setActiveVideoUrl(embedUrl);
    setShowDialog(true);
    
    // Clear auto-rotation on user interaction
    if (autoRotateInterval.current) {
      window.clearInterval(autoRotateInterval.current);
      autoRotateInterval.current = null;
    }
  };
  
  const wrapIndex = (index: number) => {
    return (index + testimonials.length) % testimonials.length;
  };
  
  const startAutoRotation = () => {
    if (autoRotateInterval.current) {
      window.clearInterval(autoRotateInterval.current);
    }
    
    autoRotateInterval.current = window.setInterval(() => {
      handleNext();
    }, 5000);
  };
  
  useEffect(() => {
    // Start auto-rotation when component mounts
    startAutoRotation();
    
    // Clean up interval on unmount
    return () => {
      if (autoRotateInterval.current) {
        window.clearInterval(autoRotateInterval.current);
      }
    };
  }, []);

  return (
    <div className="animate-fade-in mt-8 w-full max-w-3xl mx-auto">
      <h3 className="text-base mb-6 text-center">Testimonios de Estudiantes</h3>
      
      <div className="relative">
        <div className="flex justify-center items-center">
          {/* Left Testimonial */}
          {!isMobile && (
            <div 
              className="w-1/3 transition-all duration-500 opacity-60 transform scale-90 cursor-pointer"
              onClick={() => {
                setActiveIndex(wrapIndex(activeIndex - 1));
                // Reset auto-rotation after user interaction
                startAutoRotation();
              }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-notion">
                <img
                  src={testimonials[wrapIndex(activeIndex - 1)].thumbnailUrl}
                  alt={testimonials[wrapIndex(activeIndex - 1)].name}
                  className="w-full aspect-[9/16] object-cover"
                />
              </div>
            </div>
          )}
          
          {/* Center Testimonial */}
          <div className="w-full sm:w-1/3 px-2 z-10 transform scale-100">
            <DialogTrigger asChild onClick={() => handleThumbnailClick(testimonials[activeIndex].videoUrl)}>
              <div className="relative rounded-xl overflow-hidden shadow-notion cursor-pointer">
                <img
                  src={testimonials[activeIndex].thumbnailUrl}
                  alt={testimonials[activeIndex].name}
                  className="w-full aspect-[9/16] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h4 className="text-white text-sm font-medium">{testimonials[activeIndex].name}</h4>
                  <p className="text-white/80 text-xs">{testimonials[activeIndex].role}</p>
                  <p className="text-white/90 text-xs mt-1">{testimonials[activeIndex].testimonial}</p>
                </div>
              </div>
            </DialogTrigger>
          </div>
          
          {/* Right Testimonial */}
          {!isMobile && (
            <div 
              className="w-1/3 transition-all duration-500 opacity-60 transform scale-90 cursor-pointer"
              onClick={() => {
                setActiveIndex(wrapIndex(activeIndex + 1));
                // Reset auto-rotation after user interaction
                startAutoRotation();
              }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-notion">
                <img
                  src={testimonials[wrapIndex(activeIndex + 1)].thumbnailUrl}
                  alt={testimonials[wrapIndex(activeIndex + 1)].name}
                  className="w-full aspect-[9/16] object-cover"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
              // Reset auto-rotation after user interaction
              startAutoRotation();
            }}
            className="bg-white/90 rounded-full p-2 shadow-notion focus:outline-none transform hover:scale-105 transition-transform duration-300"
          >
            <ChevronLeft size={16} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
              // Reset auto-rotation after user interaction
              startAutoRotation();
            }}
            className="bg-white/90 rounded-full p-2 shadow-notion focus:outline-none transform hover:scale-105 transition-transform duration-300"
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
                onClick={() => {
                  setActiveIndex(index);
                  // Reset auto-rotation after user interaction
                  startAutoRotation();
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? "bg-notion-text" : "bg-notion-lightGray"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Video Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[80vw] max-h-[90vh] p-0 bg-black overflow-hidden">
          <div className="relative w-full aspect-video">
            <button 
              className="absolute top-2 right-2 bg-black/60 rounded-full p-1 z-10"
              onClick={() => setShowDialog(false)}
            >
              <X size={20} className="text-white" />
            </button>
            <iframe
              src={activeVideoUrl}
              className="w-full h-full"
              allowFullScreen
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialCarousel;
