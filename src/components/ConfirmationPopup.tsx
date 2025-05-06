
import { Button } from "@/components/ui/button";

type ConfirmationPopupProps = {
  username: string;
  onGetItemNow: () => void;
};

const ConfirmationPopup = ({ username, onGetItemNow }: ConfirmationPopupProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white w-80 rounded-lg overflow-hidden shadow-xl animate-fade-in">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-center text-lg font-medium">Get item</h3>
        </div>
        
        <div className="p-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center">
              <div className="text-2xl">🎮</div>
            </div>
          </div>
          
          <p className="text-center mb-4 text-sm font-medium">@{username}</p>
          
          <Button 
            className="w-full bg-white text-black hover:bg-gray-200"
            onClick={onGetItemNow}
          >
            Get item now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
