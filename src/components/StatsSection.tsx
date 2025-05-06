
import { Slider } from "@/components/ui/slider";

const StatsSection = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Game Stats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Daily Active Users</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">0</span>
              <span className="font-bold">250K+</span>
            </div>
            <Slider defaultValue={[85]} max={100} step={1} disabled />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Monthly Visits</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">0</span>
              <span className="font-bold">25M+</span>
            </div>
            <Slider defaultValue={[92]} max={100} step={1} disabled />
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Player Satisfaction</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">0%</span>
              <span className="font-bold">90%</span>
            </div>
            <Slider defaultValue={[90]} max={100} step={1} disabled />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Average Play Time</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">0 min</span>
              <span className="font-bold">45 min</span>
            </div>
            <Slider defaultValue={[75]} max={100} step={1} disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
