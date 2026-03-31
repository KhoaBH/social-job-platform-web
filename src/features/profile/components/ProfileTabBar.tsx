"use client";

import { Tab } from "../types";

interface ProfileTabBarProps {
  active: Tab;
  onChange: (t: Tab) => void;
}

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: "overview", label: "Tổng quan", icon: "◎" },
  { key: "profile", label: "Hồ sơ & Kỹ năng", icon: "⊞" },
  { key: "activity", label: "Hoạt động", icon: "◈" },
  { key: "network", label: "Mạng lưới", icon: "⬡" },
];

export default function ProfileTabBar({ active, onChange }: ProfileTabBarProps) {
  return (
    <div className="bg-white rounded-xl flex overflow-hidden mb-1 shadow-sm">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 px-2
                      text-[13.5px] font-medium border-b-2 transition-all duration-150
                      bg-transparent cursor-pointer
                      ${
                        active === t.key
                          ? "text-violet-600 border-violet-600 font-semibold"
                          : "text-gray-500 border-transparent hover:text-gray-800 hover:bg-gray-50"
                      }`}
        >
          <span className="text-base sm:inline hidden">{t.icon}</span>
          {t.label}
        </button>
      ))}
    </div>
  );
}