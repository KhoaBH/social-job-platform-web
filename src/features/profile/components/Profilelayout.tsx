"use client";

import { useState } from "react";
import { Tab } from "../types";
import ProfileHero from "./ProfileHero";
import ProfileTabBar from "./ProfileTabBar";
import OverviewTab from "./tabs/OverviewTab";
import ProfileSkillsTab from "./tabs/ProfileSkillsTab";
import ActivityTab from "./tabs/ActivityTab";
import NetworkTab from "./tabs/NetworkTab";

export default function ProfileLayout() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <>
      {/* Google Font — DM Sans + DM Serif Display */}
      {/* <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
        body, * { font-family: 'DM Sans', sans-serif; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style> */}

      <div className="min-h-screen bg-[#F0F2F5]">
        <div className="max-w-270 mx-auto px-4 py-5 flex flex-col gap-1">
          <ProfileHero onTabChange={setActiveTab} />
          <ProfileTabBar active={activeTab} onChange={setActiveTab} />

          {activeTab === "overview"  && <OverviewTab onTabChange={setActiveTab} />}
          {activeTab === "profile"   && <ProfileSkillsTab />}
          {activeTab === "activity"  && <ActivityTab />}
          {activeTab === "network"   && <NetworkTab />}
        </div>
      </div>
    </>
  );
}