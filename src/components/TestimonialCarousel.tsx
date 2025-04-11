
import { useState, useRef, useEffect } from "react";
import { Testimonial } from "@/lib/psychometric-data";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState("");
  const carouselRef = useRef<HTMLDivElement>(null);
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
  
  const startAutoRotation = () => {
    if (autoRotateInterval.current) {
      window.clearInterval(autoRotateInterval.current);
    }
    
    autoRotateInterval.current = window.setInterval(() => {
      handleNext();
    }, 3000); // Change to 3 seconds per testimonial
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
    <div className="animate-fade-in mt-8 w-full max-w-3xl mx-auto px-4 sm:px-0">
      <h3 className="text-base mb-6 text-center">Testimonios de Estudiantes</h3>
      
      <Carousel className="w-full relative" setActiveIndex={setActiveIndex}>
        <CarouselContent className="h-full">
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogTrigger asChild onClick={() => handleThumbnailClick(testimonial.videoUrl)}>
                  <div className="relative rounded-xl overflow-hidden shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-700 h-full mx-1 transform hover:scale-[1.02]">
                    <img
                      src={testimonial.thumbnailUrl}
                      alt={testimonial.name}
                      className="w-full aspect-[9/16] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h4 className="text-white text-base font-medium">{testimonial.name}</h4>
                      <p className="text-white/80 text-sm">{testimonial.role}</p>
                    </div>
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
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Custom navigation controls */}
        <div className="hidden md:block">
          <CarouselPrevious 
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
              startAutoRotation();
            }}
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-notion focus:outline-none transform hover:scale-105 transition-transform duration-300 h-8 w-8"
          />
          <CarouselNext 
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
              startAutoRotation();
            }}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-notion focus:outline-none transform hover:scale-105 transition-transform duration-300 h-8 w-8"
          />
        </div>
        
        {/* Dots indicator for all devices */}
        <div className="flex justify-center mt-4 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                startAutoRotation();
              }}
              className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                index === activeIndex ? "bg-notion-text" : "bg-notion-lightGray"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default TestimonialCarousel;
