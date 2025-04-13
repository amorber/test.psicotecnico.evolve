
import { useState, useRef, useEffect } from "react";
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

// Testimonial type definition
export interface Testimonial {
  name: string;
  role: string;
  thumbnailUrl: string;
  videoUrl: string;
}

interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Carlos",
    role: "Alumno del Máster en Ciberseguridad & IA",
    thumbnailUrl: "/Experiencia1-card-1.jpg",
    videoUrl: "https://youtu.be/D9f5hKml4Qg"
  },
  {
    name: "Noelia",
    role: "Alumna del Máster en Desarrollo Web Full Stack & IA",
    thumbnailUrl: "/Experiencia4-card-1.jpg",
    videoUrl: "https://youtu.be/MgwTHO06f1A"
  },
  {
    name: "Víctor Rico",
    role: "Alumno del Máster en Data Science & IA",
    thumbnailUrl: "/Experiencia6-card.jpg",
    videoUrl: "https://youtu.be/6kzffPuLCUg"
  },
  {
    name: "Alberto",
    role: "Alumno del Máster en Inteligencia Artificial",
    thumbnailUrl: "/Experiencia7-card-1.jpg",
    videoUrl: "https://youtu.be/JN2Kp5Z3fQc"
  },
  {
    name: "Alberto García",
    role: "Alumno del Máster en Inteligencia Artificial",
    thumbnailUrl: "/Experiencia8-card-1.jpg",
    videoUrl: "https://youtu.be/Yyw3fs355ik"
  },
  {
    name: "Mario Fernández",
    role: "Alumno del Máster en Ciberseguridad & IA",
    thumbnailUrl: "/Experiencia9-card.jpg",
    videoUrl: "https://youtu.be/RY_dzC2AZGw"
  }
];

const TestimonialCarousel = ({ testimonials = defaultTestimonials }: TestimonialCarouselProps) => {
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
  
  const handleThumbnailClick = (videoUrl: string) => {
    // Extract YouTube video ID from the URL
    const videoId = videoUrl.includes("youtu.be") 
      ? videoUrl.split("/").pop() 
      : videoUrl.includes("youtube.com/watch?v=") 
        ? new URL(videoUrl).searchParams.get("v")
        : videoUrl.split("/").pop();
        
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
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
    
    // Increased from 5000 to 8000 ms (8 seconds) for better viewing time
    autoRotateInterval.current = window.setInterval(() => {
      handleNext();
    }, 8000);
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
  
  const getItemClassName = (index: number) => {
    // Calculate the distance from the active slide (considering circular nature)
    const distance = Math.min(
      Math.abs(index - activeIndex),
      Math.abs(index - activeIndex - testimonials.length),
      Math.abs(index - activeIndex + testimonials.length)
    );
    
    // Center item
    if (distance === 0) {
      return "scale-100 opacity-100 z-10";
    }
    // Side items
    return "scale-[0.85] opacity-60 z-0";
  };
  
  return (
    <div className="animate-fade-in mt-12 w-full max-w-3xl mx-auto px-4 sm:px-6">
      <h3 className="text-base mb-8 text-center">Testimonios de Estudiantes</h3>
      
      <div className="py-6">
        <Carousel
          className="w-full relative"
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
          opts={{
            loop: true,
            duration: 500, // Fast transition for smooth experience
          }}
        >
          <CarouselContent className="h-full">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Dialog open={showDialog} onOpenChange={setShowDialog}>
                  <DialogTrigger asChild>
                    <div 
                      className={`relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl cursor-pointer transition-all duration-700 h-full mx-2 transform hover:scale-[1.02] ${getItemClassName(index)}`}
                      onClick={() => handleThumbnailClick(testimonial.videoUrl)}
                    >
                      <img
                        src={testimonial.thumbnailUrl}
                        alt={`Testimonio de ${testimonial.name}`}
                        className="w-full aspect-[9/16] object-cover rounded-xl"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-xl">
                        <h4 className="text-white text-base font-medium">{testimonial.name}</h4>
                        <p className="text-white/80 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[80vw] max-h-[90vh] p-0 bg-black/80 backdrop-blur-md overflow-hidden rounded-xl border-0">
                    <DialogTitle className="sr-only">Video testimonio de {testimonial.name}</DialogTitle>
                    <div className="relative w-full aspect-video">
                      <button 
                        className="absolute top-2 right-2 bg-black/60 rounded-full p-1 z-10"
                        onClick={() => setShowDialog(false)}
                      >
                        <X size={20} className="text-white" />
                      </button>
                      {activeVideoUrl && (
                        <iframe
                          src={activeVideoUrl}
                          className="w-full h-full"
                          allowFullScreen
                          loading="eager"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          title={`Testimonio de ${testimonial.name}`}
                        ></iframe>
                      )}
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
              className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-md focus:outline-none transform hover:scale-105 transition-transform duration-300 h-8 w-8"
            />
            <CarouselNext 
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
                startAutoRotation();
              }}
              className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-md focus:outline-none transform hover:scale-105 transition-transform duration-300 h-8 w-8"
            />
          </div>
          
          {/* Dots indicator for all devices */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  startAutoRotation();
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? "bg-notion-text" : "bg-notion-lightGray"
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
      
      {/* "Ver más testimonios" button with added top padding */}
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
            className="bg-white border-notion-lightGray hover:bg-notion-accent text-notion-mediumGray hover:text-notion-text transition-all gap-1 h-8 shadow-md"
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

