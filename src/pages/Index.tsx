
import { useState } from "react";
import GameHeader from "../components/GameHeader";
import TabNavigation from "../components/TabNavigation";
import StoreItems from "../components/StoreItems";
import PurchasePopup from "../components/PurchasePopup";
import ConfirmationPopup from "../components/ConfirmationPopup";
import AboutSection from "../components/AboutSection";
import StatsSection from "../components/StatsSection";

const Index = () => {
  const [selectedTab, setSelectedTab] = useState("About");
  const [purchasePopupOpen, setPurchasePopupOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ name: string; image: string } | null>(null);
  const [username, setUsername] = useState("");

  const handleBuyClick = (item: { name: string; image: string }) => {
    setSelectedItem(item);
    setPurchasePopupOpen(true);
  };

  const handlePurchaseConfirm = (enteredUsername: string) => {
    setUsername(enteredUsername);
    setPurchasePopupOpen(false);
    setConfirmationOpen(true);
  };

  const handleCancel = () => {
    setPurchasePopupOpen(false);
    setSelectedItem(null);
  };

  const handleGetItemNow = () => {
    setConfirmationOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <GameHeader />
      
      <div className="max-w-4xl mx-auto bg-white pb-8 shadow-md">
        <TabNavigation 
          selectedTab={selectedTab} 
          onTabChange={setSelectedTab} 
        />
        
        {selectedTab === "About" && <AboutSection />}
        
        {selectedTab === "Store" && (
          <StoreItems onBuyClick={handleBuyClick} />
        )}
        
        {selectedTab === "Servers" && (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold">Game Servers</h2>
            <p className="mt-4">Server list would go here.</p>
          </div>
        )}
        
        {selectedTab === "Stats" && <StatsSection />}
      </div>

      {purchasePopupOpen && selectedItem && (
        <PurchasePopup 
          item={selectedItem}
          onConfirm={handlePurchaseConfirm}
          onCancel={handleCancel}
        />
      )}

      {confirmationOpen && selectedItem && (
        <ConfirmationPopup 
          username={username}
          onGetItemNow={handleGetItemNow}
        />
      )}
      
      <footer className="max-w-4xl mx-auto py-4 text-xs text-gray-600 text-center border-t">
        <div className="flex justify-center space-x-4 mb-2">
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">Jobs</a>
          <a href="#" className="hover:underline">Blog</a>
          <a href="#" className="hover:underline">Parents</a>
          <a href="#" className="hover:underline">Gift Cards</a>
          <a href="#" className="hover:underline">Help</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Accessibility</a>
          <a href="#" className="hover:underline">Privacy</a>
        </div>
        <p>© 2025 Game Corporation. All trademarks are property of their respective owners.</p>
      </footer>
    </div>
  );
};

export default Index;
