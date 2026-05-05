"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import LeftSidebar from "@/features/dashboard/components/LeftSidebar";
import RightSidebar from "@/features/dashboard/components/RightSidebar";
import { Search, MapPin, DollarSign, Briefcase } from "lucide-react";
import { jobSuggestions } from "@/features/dashboard/data/mockData";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const initials = (name: string) =>
  name
    ? name
        .split(" ")
        .map((w) => w[0])
        .slice(-2)
        .join("")
    : "U";

// Extended mock job listings with IDs
const mockJobs = [
  ...jobSuggestions.map((job, i) => ({ ...job, id: `job-${i}` })),
  {
    id: "job-3",
    title: "Backend Developer",
    company: "Tiki",
    salary: "35–60tr",
    logo: "T",
    color: "#FF6B35",
  },
  {
    id: "job-4",
    title: "DevOps Engineer",
    company: "FPT Software",
    salary: "40–70tr",
    logo: "F",
    color: "#1BA5E0",
  },
  {
    id: "job-5",
    title: "Full Stack Developer",
    company: "MoMo",
    salary: "45–80tr",
    logo: "M",
    color: "#A400D6",
  },
];

export default function JobsPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    type: "", // fulltime, parttime, contract
    salaryRange: "", // low, mid, high
  });

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [searchQuery, selectedFilters]);

  return (
    <div className="max-w-282 mx-auto px-4 py-6 grid gap-5 grid-cols-[225px_1fr_300px] max-[1024px]:grid-cols-[200px_1fr] max-[768px]:grid-cols-1">
      {/* Left Sidebar */}
      <div className="max-[768px]:hidden">
        <LeftSidebar initials={initials} userFullName={user?.fullName || ""} />
      </div>

      {/* Main Feed */}
      <div className="flex flex-col gap-2.5">
        {/* Search & Filters */}
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

          {/* Filter buttons */}
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

        {/* Job Listings */}
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
                  {/* Company Logo */}
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center text-lg font-bold text-white shrink-0"
                    style={{ background: job.color }}
                  >
                    {job.logo}
                  </div>

                  {/* Job Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-bold text-[#111827] leading-snug">
                      {job.title}
                    </h3>
                    <p className="text-[13px] text-[#666] mt-0.5">
                      {job.company}
                    </p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[12px] text-[#0A66C2] font-semibold">
                        <DollarSign size={13} />
                        {job.salary}/tháng
                      </span>
                      <span className="inline-flex items-center gap-1 text-[12px] text-[#666]">
                        <MapPin size={13} />
                        TP.HCM
                      </span>
                    </div>
                  </div>

                  {/* Apply Button */}
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

      {/* Right Sidebar */}
      <div className="max-[1024px]:hidden">
        <RightSidebar />
      </div>
    </div>
  );
}
