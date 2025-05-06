
import { cn } from "@/lib/utils";

type TabNavigationProps = {
  selectedTab: string;
  onTabChange: (tab: string) => void;
};

const TabNavigation = ({ selectedTab, onTabChange }: TabNavigationProps) => {
  const tabs = ["About", "Store", "Servers"];

  return (
    <div className="border-b">
      <div className="max-w-4xl mx-auto">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={cn(
                "px-8 py-3 font-medium transition-colors",
                selectedTab === tab
                  ? "border-b-2 border-black"
                  : "text-gray-500 hover:text-gray-800"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
