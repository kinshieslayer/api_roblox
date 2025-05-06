
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  "/lovable-uploads/2c4cf6e5-c6ae-4745-95f3-6cbf50a90645.png",
  "/lovable-uploads/1df7cb00-4f14-451e-b3ec-ac7d401a44fc.png",
  "/lovable-uploads/7c396ca5-444d-4dd0-bad0-2926aa83dfc5.png",
  "/lovable-uploads/bff79ebf-0d16-444d-bacc-bb7f032f0b46.png"
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
    <div className="w-full max-w-4xl mx-auto my-6">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src={image} 
                    alt={`Game Screenshot ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 bg-white" />
        <CarouselNext className="-right-4 bg-white" />
      </Carousel>
    </div>
  );
};

export default ImageSlider;
