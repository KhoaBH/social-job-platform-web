"use client";

import { Check, DollarSign, MapPin, Users, Calendar } from "lucide-react";
import { type MockJobPost } from "@/features/jobs/data/mockJobPosts";

interface JobDetailViewProps {
  job: MockJobPost;
  isApplied: boolean;
  isFollowed: boolean;
  onBack: () => void;
  onApply: () => void;
  onToggleFollow: () => void;
}

const formatSalary = (salaryMin: number, salaryMax: number) => {
  const toTr = (value: number) => `${Math.round(value / 1000000)}`;
  return `${toTr(salaryMin)}–${toTr(salaryMax)}tr`;
};

const formatExperienceLevel = (level: MockJobPost["experienceLevel"]) => {
  const labels: Record<MockJobPost["experienceLevel"], string> = {
    INTERN: "Intern",
    JUNIOR: "Junior",
    MID: "Mid",
    SENIOR: "Senior",
    LEAD: "Lead",
  };

  return labels[level];
};

export default function JobDetailView({
  job,
  isApplied,
  isFollowed,
  onBack,
  onApply,
  onToggleFollow,
}: JobDetailViewProps) {
  return (
    <div className="min-h-screen bg-[#F2F2F7] py-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#0A66C2] font-semibold mb-4 hover:underline"
          >
            ← Quay lại
          </button>

          <div className="bg-white rounded-[10px] p-6 border border-[#E4E4E7]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold text-white shrink-0"
                    style={{ background: job.company.color }}
                  >
                    {job.company.logo}
                  </div>

                  <div className="flex-1">
                    <h1 className="text-[28px] font-bold text-[#111827] leading-tight">
                      {job.title}
                    </h1>
                    <p className="text-[16px] text-[#666] mt-1">
                      {job.company.name}
                    </p>
                    <div className="flex items-center gap-3 mt-3 flex-wrap text-[13px]">
                      <span className="flex items-center gap-1 text-[#0A66C2] font-semibold">
                        <DollarSign size={14} />
                        {formatSalary(job.salaryMin, job.salaryMax)}/tháng
                      </span>
                      <span className="text-[#666]">•</span>
                      <span className="flex items-center gap-1 text-[#666]">
                        <MapPin size={14} />
                        {job.location}
                      </span>
                      <span className="text-[#666]">•</span>
                      <span className="text-[#666]">{formatExperienceLevel(job.experienceLevel)}</span>
                      <span className="text-[#666]">•</span>
                      <span className="text-[#999]">{job.postedAt}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={onApply}
                disabled={isApplied}
                className={`px-6 py-3 rounded-full text-[14px] font-semibold shrink-0 transition-colors duration-150 ${
                  isApplied
                    ? "bg-[#E8F3E8] text-[#10B981] cursor-not-allowed flex items-center gap-2"
                    : "bg-[#0A66C2] text-white hover:bg-[#0958a8]"
                }`}
              >
                {isApplied && <Check size={16} />}
                {isApplied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#E4E4E7]">
              <div>
                <p className="text-[12px] text-[#999] font-semibold">Cấp độ</p>
                <p className="text-[13px] font-semibold text-[#111827] mt-1">
                  {formatExperienceLevel(job.experienceLevel)}
                </p>
              </div>
              <div>
                <p className="text-[12px] text-[#999] font-semibold">
                  Trạng thái
                </p>
                <p className="text-[13px] font-semibold text-[#111827] mt-1">
                  {job.status}
                </p>
              </div>
              <div>
                <p className="text-[12px] text-[#999] font-semibold">
                  Người đăng
                </p>
                <p className="text-[13px] font-semibold text-[#111827] mt-1">
                  {job.postedBy.fullName}
                </p>
              </div>
              <div>
                <p className="text-[12px] text-[#999] font-semibold">
                  Lượt ứng tuyển
                </p>
                <p className="text-[13px] font-semibold text-[#111827] mt-1">
                  {job.applications}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 max-[1024px]:grid-cols-1">
          <div className="col-span-2">
            <div className="bg-white rounded-[10px] p-6 border border-[#E4E4E7] mb-6">
              <h2 className="text-[18px] font-bold text-[#111827] mb-4">
                Mô tả công việc
              </h2>
              <div className="prose prose-sm max-w-none text-[14px] leading-[1.7] text-[#555] whitespace-pre-wrap font-bold">
                {job.description}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-[10px] p-6 border border-[#E4E4E7] sticky top-24 mb-6">
              <div className="text-center mb-4">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 shrink-0"
                  style={{ background: job.company.color }}
                >
                  {job.company.logo}
                </div>
                <h3 className="text-[16px] font-bold text-[#111827]">
                  {job.company.name}
                </h3>
                <p className="text-[12px] text-[#999] mt-2">
                  {job.company.employeeCount.toLocaleString()} nhân viên
                </p>
              </div>

              <p className="text-[13px] leading-[1.6] text-[#666] mb-4">
                {job.company.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4 text-[12px] text-[#666]">
                <div className="flex items-center gap-2 rounded-lg bg-[#F8FAFC] px-3 py-2">
                  <Users size={14} className="text-[#0A66C2]" />
                  {job.company.employeeCount.toLocaleString()} nhân viên
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-[#F8FAFC] px-3 py-2">
                  <Calendar size={14} className="text-[#0A66C2]" />
                  Thành lập {job.company.foundedYear}
                </div>
              </div>

              <button
                onClick={onToggleFollow}
                className={`w-full px-4 py-2 rounded-full text-[13px] font-semibold transition-colors duration-150 ${
                  isFollowed
                    ? "bg-[#E8F3E8] text-[#10B981] border border-[#10B981]"
                    : "bg-[#F2F2F7] text-[#0A66C2] border border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white"
                }`}
              >
                {isFollowed ? "✓ Đã theo dõi" : "Theo dõi công ty"}
              </button>
            </div>

            <div className="bg-white rounded-[10px] p-6 border border-[#E4E4E7] sticky top-64">
              <h3 className="text-[16px] font-bold text-[#111827] mb-4">
                Quyền lợi nhân viên
              </h3>
              <div className="space-y-3">
                {job.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F3E8] flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="text-[#10B981]" />
                    </div>
                    <span className="text-[13px] text-[#666]">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
