"use client";

import dynamic from "next/dynamic";
 
const DashboardLayout = dynamic(
  () => import("@/features/dashboard/components/DashboardLayout"),
  { ssr: false }
);
 
export default function DashboardPage() {
  return <DashboardLayout />;
}
 