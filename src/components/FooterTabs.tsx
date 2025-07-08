import type { FC } from "react";
import { useState } from "react";

const tabs = ["All Orders", "Pending", "Reviewed", "Arrived", "+"];

export const FooterTabs: FC = () => {
  const [activeTab, setActiveTab] = useState("All Orders");

  return (
    <div className="flex border-t border-gray-200 bg-white text-[13px]">
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              console.log(`Switched to: ${tab}`);
            }}
            className={`px-4 py-2 border-r border-gray-200 whitespace-nowrap transition
              ${
                isActive
                  ? "bg-green-100 text-green-800 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};
