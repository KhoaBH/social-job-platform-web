"use client";
 
import dynamic from "next/dynamic";
 
const ProfileLayout = dynamic(
  () => import("@/features/profile/components/Profilelayout"),
  { ssr: false }
);
 
export default function ProfilePage() {
  return <ProfileLayout />;
}
 