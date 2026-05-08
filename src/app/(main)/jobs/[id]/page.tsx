"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import JobDetailView, {
} from "@/features/jobs/components/JobDetailView";
import { mockJobPosts, type MockJobPost } from "@/features/jobs/data/mockJobPosts";

const mockJobs = Object.fromEntries(
  mockJobPosts.map((job) => [job.id, job])
) as Record<string, MockJobPost>;

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isApplied, setIsApplied] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  const jobId = params.id as string;
  const job = mockJobs[jobId];

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7]">
        <div className="text-center">
          <p className="text-[16px] font-semibold text-[#666] mb-4">
            Công việc không tìm thấy
          </p>
          <Link
            href="/jobs"
            className="text-[#0A66C2] font-semibold hover:underline"
          >
            ← Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  return (
    <JobDetailView
      job={job}
      isApplied={isApplied}
      isFollowed={isFollowed}
      onBack={() => router.back()}
      onApply={() => setIsApplied(true)}
      onToggleFollow={() => setIsFollowed((value) => !value)}
    />
  );
}
