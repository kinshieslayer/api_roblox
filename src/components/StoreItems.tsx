
import { Button } from "@/components/ui/button";

type StoreItemsProps = {
  onBuyClick: (item: { name: string; image: string }) => void;
};

const StoreItems = ({ onBuyClick }: StoreItemsProps) => {
  const items = [
    {
      name: "Vehicle Upgrade",
      image: "/lovable-uploads/1df7cb00-4f14-451e-b3ec-ac7d401a44fc.png",
      isFree: true
    },
    {
      name: "Vehicle Speed Unlocked",
      image: "/lovable-uploads/1df7cb00-4f14-451e-b3ec-ac7d401a44fc.png",
      isFree: true
    },
    {
      name: "Premium",
      image: "/lovable-uploads/1df7cb00-4f14-451e-b3ec-ac7d401a44fc.png",
      isFree: true
    },
    {
      name: "Music Unlocked",
      image: "/lovable-uploads/1df7cb00-4f14-451e-b3ec-ac7d401a44fc.png",
      isFree: true
    },
    {
      name: "On Demand Fire",
      image: "/lovable-uploads/1df7cb00-4f14-451e-b3ec-ac7d401a44fc.png",
      isFree: true
    },
    {
      name: "Horse Unlocked",
      image: "/lovable-uploads/1df7cb00-4f14-451e-b3ec-ac7d401a44fc.png",
      isFree: true
    },
    {
      name: "Land Unlocked",
      image: "/lovable-uploads/7c396ca5-444d-4dd0-bad0-2926aa83dfc5.png",
      isFree: true
    },
    {
      name: "Faces Unlocked",
      image: "/lovable-uploads/7c396ca5-444d-4dd0-bad0-2926aa83dfc5.png",
      isFree: true
    },
    {
      name: "Vehicle Pack",
      image: "/lovable-uploads/7c396ca5-444d-4dd0-bad0-2926aa83dfc5.png",
      isFree: true
    },
    {
      name: "Penthouse",
      image: "/lovable-uploads/7c396ca5-444d-4dd0-bad0-2926aa83dfc5.png",
      isFree: true
    },
    {
      name: "Theme Pack",
      image: "/lovable-uploads/7c396ca5-444d-4dd0-bad0-2926aa83dfc5.png",
      isFree: true
    },
    {
      name: "Disaster Pass",
      image: "/lovable-uploads/7c396ca5-444d-4dd0-bad0-2926aa83dfc5.png",
      isFree: true
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Passes</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-20 h-20 object-contain mb-2" 
            />
            <p className="text-sm font-semibold text-center mb-1">{item.name}</p>
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs">Free</span>
            </div>
            <Button 
              variant="outline" 
              className="w-full text-sm py-1 px-4"
              onClick={() => onBuyClick({ name: item.name, image: item.image })}
            >
              Buy
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreItems;
