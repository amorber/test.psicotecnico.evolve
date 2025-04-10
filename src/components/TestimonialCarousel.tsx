
import { useState, useRef, useEffect } from "react";
import { Testimonial } from "@/lib/psychometric-data";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { GlareCard } from "@/components/ui/glare-card";

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

  // Custom card content renderer
  const renderCardContent = (index: number) => (
    <>
      <img
        src={testimonials[index].thumbnailUrl}
        alt={testimonials[index].name}
        className="w-full h-full absolute inset-0 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5 z-10">
        <h4 className="text-white text-lg font-medium">{testimonials[index].name}</h4>
        <p className="text-white/90 text-sm mt-1">{testimonials[index].role}</p>
      </div>
    </>
  );

  return (
    <div className="animate-fade-in mt-12 w-full max-w-4xl mx-auto">
      <h3 className="text-xl font-medium mb-8 text-center">Testimonios de Estudiantes</h3>
      
      <div className="relative mx-auto flex justify-center items-center gap-4">
        {/* Left Testimonial */}
        {!isMobile && (
          <div 
            className="transition-all duration-700 transform scale-90 cursor-pointer"
            onClick={() => {
              setActiveIndex(wrapIndex(activeIndex - 1));
              // Reset auto-rotation after user interaction
              startAutoRotation();
            }}
          >
            <GlareCard className="relative">
              {renderCardContent(wrapIndex(activeIndex - 1))}
            </GlareCard>
          </div>
        )}
        
        {/* Center Testimonial */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <div 
              className="z-10 transform scale-105 transition-all duration-700"
              onClick={() => handleThumbnailClick(testimonials[activeIndex].videoUrl)}
            >
              <GlareCard className="relative cursor-pointer">
                {renderCardContent(activeIndex)}
              </GlareCard>
            </div>
          </DialogTrigger>
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
        
        {/* Right Testimonial */}
        {!isMobile && (
          <div 
            className="transition-all duration-700 transform scale-90 cursor-pointer"
            onClick={() => {
              setActiveIndex(wrapIndex(activeIndex + 1));
              // Reset auto-rotation after user interaction
              startAutoRotation();
            }}
          >
            <GlareCard className="relative">
              {renderCardContent(wrapIndex(activeIndex + 1))}
            </GlareCard>
          </div>
        )}
        
        {/* Controls */}
        <div className="absolute inset-y-0 left-0 -translate-x-12 flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
              // Reset auto-rotation after user interaction
              startAutoRotation();
            }}
            className="bg-white/90 rounded-full p-3 shadow-lg focus:outline-none transform hover:scale-105 transition-transform duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 translate-x-12 flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
              // Reset auto-rotation after user interaction
              startAutoRotation();
            }}
            className="bg-white/90 rounded-full p-3 shadow-lg focus:outline-none transform hover:scale-105 transition-transform duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        {/* Dots indicator for mobile */}
        {isMobile && (
          <div className="absolute -bottom-10 left-0 right-0 flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  // Reset auto-rotation after user interaction
                  startAutoRotation();
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                  index === activeIndex ? "bg-notion-text" : "bg-notion-lightGray"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
