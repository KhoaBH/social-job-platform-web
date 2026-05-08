"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import JobsListView from "@/features/jobs/components/JobsListView";

export default function JobsPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  return <JobsListView userFullName={user?.fullName || ""} />;
}
