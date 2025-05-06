
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type PurchasePopupProps = {
  item: {
    name: string;
    image: string;
  };
  onConfirm: (username: string) => void;
  onCancel: () => void;
};

const PurchasePopup = ({ item, onConfirm, onCancel }: PurchasePopupProps) => {
  const [username, setUsername] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white w-80 rounded-lg overflow-hidden shadow-xl">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-center text-lg font-medium">Get item</h3>
        </div>
        
        <div className="p-4">
          <div className="flex justify-center mb-4">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />
          </div>
          
          <p className="text-center mb-4">Would you like to Get "{item.name}"?</p>
          
          <Input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 bg-white text-black"
          />
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 border-gray-600 text-white"
              onClick={onCancel}
            >
              Cancel
            </Button>
            
            <Button 
              className="flex-1 bg-white text-black hover:bg-gray-200"
              onClick={() => onConfirm(username)}
              disabled={!username}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePopup;
