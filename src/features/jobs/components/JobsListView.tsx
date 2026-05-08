"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import LeftSidebar from "@/features/dashboard/components/LeftSidebar";
import RightSidebar from "@/features/dashboard/components/RightSidebar";
import { Search, MapPin, DollarSign, Briefcase } from "lucide-react";
import { mockJobPosts } from "@/features/jobs/data/mockJobPosts";

interface JobsListViewProps {
  userFullName: string;
}

const initials = (name: string) =>
  name
    ? name
        .split(" ")
        .map((w) => w[0])
        .slice(-2)
        .join("")
    : "U";

const formatSalary = (salaryMin: number, salaryMax: number) => {
  const toTr = (value: number) => `${Math.round(value / 1000000)}`;
  return `${toTr(salaryMin)}–${toTr(salaryMax)}tr`;
};

export default function JobsListView({ userFullName }: JobsListViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters] = useState({
    type: "",
    salaryRange: "",
  });

  const filteredJobs = useMemo(() => {
    return mockJobPosts.filter((job) => {
      if (job.status !== "ACTIVE") {
        return false;
      }

      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [searchQuery, selectedFilters]);

  return (
    <div className="max-w-282 mx-auto px-4 py-6 grid gap-5 grid-cols-[225px_1fr_300px] max-[1024px]:grid-cols-[200px_1fr] max-[768px]:grid-cols-1">
      <div className="max-[768px]:hidden">
        <LeftSidebar initials={initials} userFullName={userFullName} />
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="bg-white border border-[#E4E4E7] rounded-[10px] p-4">
          <div className="flex items-center gap-2 bg-[#EEF3F8] rounded-md px-3 h-10 mb-4">
            <Search size={18} className="text-[#0A66C2]" />
            <input
              type="text"
              placeholder="Tìm kiếm công việc, công ty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none font-inherit text-[14px] text-[#1A1A1A] w-full placeholder:text-[#888]"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-[#444] border-[1.5px] border-[#C9CDD2] bg-transparent cursor-pointer hover:bg-[#F2F2F7]">
              <Briefcase size={14} />
              Loại công việc
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-[#444] border-[1.5px] border-[#C9CDD2] bg-transparent cursor-pointer hover:bg-[#F2F2F7]">
              <MapPin size={14} />
              Địa điểm
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-[#444] border-[1.5px] border-[#C9CDD2] bg-transparent cursor-pointer hover:bg-[#F2F2F7]">
              <DollarSign size={14} />
              Lương
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {filteredJobs.length === 0 ? (
            <div className="bg-white border border-[#E4E4E7] rounded-[10px] p-6 text-center text-[#666]">
              <p className="text-[14px] font-semibold mb-1">
                Không tìm thấy công việc nào
              </p>
              <p className="text-[12px]">Thử tìm kiếm với từ khóa khác</p>
            </div>
          ) : (
            filteredJobs.map((job, idx) => (
              <Link
                key={idx}
                href={`/jobs/${job.id}`}
                className="bg-white border border-[#E4E4E7] rounded-[10px] p-4 hover:border-[#0A66C2] hover:shadow-sm transition-all duration-150 cursor-pointer block"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center text-lg font-bold text-white shrink-0"
                    style={{ background: job.company.color }}
                  >
                    {job.company.logo}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-bold text-[#111827] leading-snug">
                      {job.title}
                    </h3>
                    <p className="text-[13px] text-[#666] mt-0.5">
                      {job.company.name}
                    </p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[12px] text-[#0A66C2] font-semibold">
                        <DollarSign size={13} />
                        {formatSalary(job.salaryMin, job.salaryMax)}/tháng
                      </span>
                      <span className="inline-flex items-center gap-1 text-[12px] text-[#666]">
                        <MapPin size={13} />
                        {job.location}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => e.preventDefault()}
                    className="px-4 py-2 rounded-full bg-[#0A66C2] text-white text-[12px] font-semibold shrink-0 hover:bg-[#0958a8] transition-colors duration-150"
                  >
                    Ứng tuyển
                  </button>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      <div className="max-[1024px]:hidden">
        <RightSidebar />
      </div>
    </div>
  );
}
