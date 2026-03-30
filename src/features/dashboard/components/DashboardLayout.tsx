"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import LeftSidebar from "./LeftSidebar";
import Feed from "./Feed";
import RightSidebar from "./RightSidebar";

const initials = (name: string) =>
  name ? name.split(" ").map((w) => w[0]).slice(-2).join("") : "U";

export default function DashboardLayout() {
  const user = useSelector((state: RootState) => state.auth.user);
  const fullName = user?.fullName || "";

  return (
    <div className="max-w-282 mx-auto px-4 py-6
                    grid gap-5
                    grid-cols-[225px_1fr_300px]
                    max-[1024px]:grid-cols-[200px_1fr]
                    max-[768px]:grid-cols-1">
      {/* Left */}
      <div className="max-[768px]:hidden">
        <LeftSidebar initials={initials} userFullName={fullName} />
      </div>

      {/* Feed */}
      <Feed initials={initials} userFullName={fullName} />

      {/* Right */}
      <div className="max-[1024px]:hidden">
        <RightSidebar />
      </div>
    </div>
  );
}