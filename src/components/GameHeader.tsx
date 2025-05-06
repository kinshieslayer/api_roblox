
import { Button } from "@/components/ui/button";

const GameHeader = () => {
  return (
    <div className="relative">
      <div className="bg-gray-800 text-white px-4 py-2 flex items-center">
        <div className="flex items-center mr-4">
          <div className="h-6 w-6 bg-gray-600 rounded-sm mr-2"></div>
          <span className="mr-6">Charts</span>
          <span className="mr-6">Marketplace</span>
          <span className="mr-6">Create</span>
          <span>Robux</span>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3">
            <img 
              src="/lovable-uploads/2c4cf6e5-c6ae-4745-95f3-6cbf50a90645.png" 
              alt="Game Banner" 
              className="w-full h-auto"
            />
          </div>
          
          <div className="md:w-1/3 p-4 bg-white">
            <div className="mb-4">
              <h1 className="text-3xl font-bold">Brookhaven 🏡 RP</h1>
              <p className="text-gray-600">By Wolfpaq Games</p>
              <p className="text-gray-600">Maturity: Minimal</p>
            </div>
            
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mb-4">
              <span className="mr-2">▶</span> Play
            </Button>
            
            <div className="flex justify-between text-center">
              <div>
                <div className="flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <span className="text-sm">Favorite</span>
              </div>
              <div>
                <div className="text-sm font-bold">9M+</div>
                <span className="text-sm">Likes</span>
              </div>
              <div>
                <div className="text-sm font-bold">1M+</div>
                <span className="text-sm">Dislikes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
