
import ImageSlider from "./ImageSlider";

const AboutSection = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">About This Game</h2>
      
      <ImageSlider />
      
      <div className="max-w-3xl mx-auto mt-8">
        <h3 className="text-xl font-semibold mb-2">Description</h3>
        <p className="mb-4">
          A place to hang out with like minded people and roleplay. Own and live in amazing houses, 
          drive cool vehicles and explore the city. Be whoever you want to be in Brookhaven RP.
        </p>
        
        <h3 className="text-xl font-semibold mb-2">Latest Update:</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>👠 New Fashion Show Estate</li>
          <li>💄 4 New Tools: Camera, Scorecard, Lipstick, Makeup</li>
          <li>💡2 New Props: Ring Light, Umbrella Light</li>
          <li>👯 24 New Casual & Fashion Emotes... including a collaboration with Dress to Impress to bring Pose 28 to Brookhaven!</li>
          <li>Thanks for playing!</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-2">Private Server Benefits:</h3> 
        <p className="mb-4">
          No wait time for changing house. Spawn up to three vehicles plus horse and bike. 
          Prop limit increased. Ability to change time, lighting and weather. 
          Temporarily ban players from the server. Freecam for PC users.
        </p>
        
        <h3 className="text-xl font-semibold mb-2">Private Servers:</h3>
        <p className="mb-4">
          To open private server controls you must be owner of a server & open settings 
          on bottom left & click lock button. PC users left shift + P to toggle Freecam On/Off.
        </p>
        
        <h3 className="text-xl font-semibold mb-2">Maturity:</h3>
        <p>Minimal (Suitable for everyone)</p>
      </div>
    </div>
  );
};

export default AboutSection;
