"use client";

import React, { useState } from "react";

type TabType = "today" | "upcoming" | "live";

interface MatchTabsProps {
  onTabChange: (tab: TabType) => void;
  activeTab: TabType;
}

export default function MatchTabs({ onTabChange, activeTab }: MatchTabsProps) {
  const tabs = [
    { id: "today" as TabType, label: "Aujourd'hui", icon: "📅" },
    { id: "upcoming" as TabType, label: "Prochains", icon: "🔜" },
    { id: "live" as TabType, label: "En Direct", icon: "🔴" },
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow-sm sticky top-16 z-10">
      <div className="flex justify-center items-center gap-4 p-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
              ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md scale-105"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }
            `}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-sm md:text-base">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
