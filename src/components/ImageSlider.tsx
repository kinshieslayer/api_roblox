
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  "/lovable-uploads/bbf94c08-cc46-4eca-b092-098b942d6984.png",
  "/lovable-uploads/5af9d27c-0032-4fd3-b47f-f61b92246305.png",
  "/lovable-uploads/a3783310-78ca-442e-a65a-6588caa0cd67.png"
];

const ImageSlider = () => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (autoPlay) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay]);

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div>
              <div className="overflow-hidden">
                <img 
                  src={image} 
                  alt={`Game Screenshot ${index + 1}`}
                  className="w-full h-[300px] object-cover"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 bg-white/70" />
      <CarouselNext className="absolute right-2 bg-white/70" />
    </Carousel>
  );
};

export default ImageSlider;
