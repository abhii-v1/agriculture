import React from "react";
import { Star } from "lucide-react";

const SubscriptionCard: React.FC = () => {
  return (
    <div className="w-80 bg-gradient-to-b from-[#203030] to-[#0a0f15] rounded-2xl shadow-xl text-white p-6 relative overflow-hidden border border-[#2c3e50]">
      {/* Glow background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-400/10 to-transparent pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-green-400/20 p-2 rounded-full">
          <Star className="text-green-400 w-5 h-5" />
        </div>
        <h2 className="text-lg font-semibold">Premium Plan</h2>
      </div>

      {/* Price */}
      <div className="text-5xl font-bold mb-2 tracking-wide">49.99<span className="text-3xl">$</span></div>

      <div className="border-t border-gray-600/40 my-4"></div>

      {/* Features */}
      <ul className="space-y-3 text-gray-200">
        <li className="flex items-center space-x-2">
          <span className="text-green-400">➤</span>
          <span>Unlock 90% of site’s content</span>
        </li>
        <li className="flex items-center space-x-2">
          <span className="text-green-400">➤</span>
          <span>Delve into in-depth analyses</span>
        </li>
        <li className="flex items-center space-x-2">
          <span className="text-green-400">➤</span>
          <span>Explore thought provoking features</span>
        </li>
      </ul>

      {/* Button */}
      <button className="mt-8 w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition-all">
        Buy now to get access
      </button>
    </div>
  );
};

export default SubscriptionCard;
