"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import "../styles/dashboard.css";
import Navbar from "./Navbar";
import LeftSidebar from "./LeftSidebar";
import Feed from "./Feed";
import RightSidebar from "./RightSidebar";

// Helper dùng chung trong layout
const initials = (name: string) =>
  name
    ? name.split(" ").map((w) => w[0]).slice(-2).join("")
    : "U";

export default function DashboardLayout() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [activeNav, setActiveNav] = useState(0);
  const fullName = user?.fullName || "";

  return (
    <div className="jub">
      <Navbar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        initials={initials}
      />
      <div className="jub-body">
        <LeftSidebar initials={initials} userFullName={fullName} />
        <Feed initials={initials} userFullName={fullName} />
        <RightSidebar />
      </div>
    </div>
  );
}