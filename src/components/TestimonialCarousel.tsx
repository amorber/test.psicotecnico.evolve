import { useState, useRef, useEffect } from "react";
import { Testimonial } from "@/lib/psychometric-data";
import { ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger,
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState("");
  const autoRotateInterval = useRef<number | null>(null);
  const isMobile = useIsMobile();
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleThumbnailClick = (videoUrl: string, testimonialName: string) => {
    const videoId = videoUrl.split("/").pop();
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    setActiveVideoUrl(embedUrl);
    setShowDialog(true);
    
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
    }, 10000);
  };
  
  useEffect(() => {
    startAutoRotation();
    
    return () => {
      if (autoRotateInterval.current) {
        window.clearInterval(autoRotateInterval.current);
      }
    };
  }, []);

  const getItemClassName = (index: number) => {
    const distance = Math.min(
      Math.abs(index - activeIndex),
      Math.abs(index - activeIndex - testimonials.length),
      Math.abs(index - activeIndex + testimonials.length)
    );
    
    if (distance === 0) {
      return "scale-[0.98] opacity-100 z-10";
    }
    return "scale-[0.9] opacity-60 z-0";
  };

  return (
    <div className="animate-fade-in mt-8 w-full max-w-3xl mx-auto px-0">
      <h3 className="text-base mb-6 text-center sm:text-base text-[calc(0.875rem+2px)]">Testimonios de Estudiantes</h3>
      
      <Carousel
        className="w-full relative" 
        setActiveIndex={setActiveIndex}
        activeIndex={activeIndex}
        opts={{
          loop: true,
          duration: 300,
        }}
      >
        <CarouselContent className={`h-full ${isMobile ? '-ml-0 pl-0 space-x-3' : ''}`}>
          {testimonials.map((testimonial, index) => (
            <CarouselItem 
              key={index} 
              className={`${isMobile ? 'basis-[85%] pl-0' : 'md:basis-1/2 lg:basis-1/3'}`}
            >
              <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogTrigger asChild onClick={() => handleThumbnailClick(testimonial.videoUrl, testimonial.name)}>
                  <div 
                    className={`relative rounded-xl overflow-hidden shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-700 h-full mx-0 transform hover:scale-[1.01] ${getItemClassName(index)}`}
                  >
                    <img
                      src={testimonial.thumbnailUrl}
                      alt={testimonial.name}
                      className={`w-full ${isMobile ? 'aspect-[9/16] h-[420px] object-cover object-center mx-auto' : 'aspect-[9/16] object-cover'} rounded-xl`}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-xl">
                      <h4 className={`text-white font-medium ${isMobile ? 'text-[calc(0.875rem+4px)]' : 'text-base sm:text-base'}`}>{testimonial.name}</h4>
                      <p className={`text-white/80 ${isMobile ? 'text-[calc(0.75rem+4px)]' : 'text-sm sm:text-sm'}`}>{testimonial.role}</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[80vw] max-h-[90vh] p-0 bg-black/90 backdrop-blur-sm overflow-hidden rounded-xl">
                  <DialogTitle className="sr-only">Video de testimonio</DialogTitle>
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
                      loading="eager"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      title="Testimonio de estudiante"
                    ></iframe>
                  </div>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        
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
      
      <div className="flex justify-center mt-8 pt-2">
        <a 
          href="https://evolveacademy.es/experiencias/#historias" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-notion-text hover:text-gray-800 transition-colors"
        >
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white border-notion-lightGray hover:bg-notion-accent text-notion-mediumGray hover:text-notion-text transition-all gap-1 h-8 shadow-notion text-xs"
          >
            Ver más testimonios
            <ExternalLink size={12} />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
