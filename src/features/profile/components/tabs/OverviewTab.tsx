"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Link2,
  Users,
  BarChart2,
  Search,
  Eye,
  FileText,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import {
  mockProfileUser,
  mockExperiences,
  mockEducation,
  mockSkills,
} from "../../data/profileMockData";
import ExperienceItem from "../shared/ExperienceItem";
import EducationItem from "../shared/EducationItem";
import SectionHead from "../shared/Sectionhead";
import { Tab } from "../../types";
// import AddExperienceModal from "../models/Addexperiencemodal";
import AddExperienceModal from "../models/AddExperienceModal/index";

interface OverviewTabProps {
  onTabChange: (t: Tab) => void;
}

export default function OverviewTab({ onTabChange }: OverviewTabProps) {
  const u = mockProfileUser;
  const [addExpOpen, setAddExpOpen] = useState(false);

  const analyticsItems = [
    { icon: <Users size={20} />, num: u.profileViews, label: "Lượt xem hồ sơ" },
    {
      icon: <BarChart2 size={20} />,
      num: u.postImpressions,
      label: "Lượt hiển thị bài",
    },
    {
      icon: <Search size={20} />,
      num: u.searchAppearances,
      label: "Xuất hiện tìm kiếm",
    },
  ];

  return (
    <div className="animate-[fadeIn_0.2s_ease]">
      <div className="grid grid-cols-[1fr_300px] gap-4 max-[900px]:grid-cols-1">
        {/* ── Main column ── */}
        <div className="flex flex-col gap-3">
          {/* Bio */}
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <SectionHead title="Giới thiệu" showEdit={u.isOwner} />
            <p className="text-[14px] text-gray-600 leading-relaxed whitespace-pre-line">
              {u.bio}
            </p>
            <div className="mt-2.5">
              <a
                href={`https://${u.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] text-violet-600 font-medium hover:underline"
              >
                <Link2 size={13} />
                {u.website}
              </a>
            </div>
          </section>

          {/* Experience preview */}
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <SectionHead
              title="Kinh nghiệm"
              showAdd={u.isOwner}
              onAdd={() => setAddExpOpen(true)}
              onSeeAll={() => onTabChange("profile")}
            />
            {mockExperiences.slice(0, 2).map((exp) => (
              <ExperienceItem key={exp.id} exp={exp} compact />
            ))}
          </section>

          {/* Education preview */}
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <SectionHead
              title="Học vấn"
              onSeeAll={() => onTabChange("profile")}
            />
            {mockEducation.map((edu) => (
              <EducationItem key={edu.id} edu={edu} compact />
            ))}
          </section>

          {/* Skills preview */}
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <SectionHead
              title="Kỹ năng"
              onSeeAll={() => onTabChange("profile")}
            />
            <div className="flex flex-wrap gap-2">
              {mockSkills.slice(0, 6).map((sk) => (
                <span
                  key={sk.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-violet-600 text-[12.5px] font-medium"
                >
                  {sk.name}
                  {sk.endorsements > 0 && (
                    <span className="bg-violet-600 text-white rounded-full px-1.5 text-[10px] font-bold">
                      {sk.endorsements}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* ── Side column ── */}
        <div className="flex flex-col gap-3 max-[900px]:hidden">
          {/* Analytics */}
          {u.isOwner && (
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4.5 pt-4 pb-3 text-[14px] font-semibold text-gray-900 flex items-center justify-between">
                <span>Phân tích</span>
                <span className="flex items-center gap-1 text-[11.5px] text-gray-400 font-normal">
                  <Eye size={12} /> Riêng tư
                </span>
              </div>
              <div className="px-4.5 pb-3.5 flex flex-col gap-3">
                {analyticsItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-gray-400">{item.icon}</span>
                    <div>
                      <div className="text-[15px] font-bold text-gray-900">
                        {item.num}
                      </div>
                      <div className="text-[12px] text-gray-400">
                        {item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="w-full flex items-center justify-center gap-1 py-3 border-t border-gray-100
                                 text-[13px] font-semibold text-violet-600 bg-transparent border-l-0 border-r-0 border-b-0
                                 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                Xem tất cả <ArrowRight size={13} />
              </button>
            </div>
          )}

          {/* Suggestions */}
          {u.isOwner && (
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4.5 pt-4 pb-3 text-[14px] font-semibold text-gray-900 flex items-center justify-between">
                <span>Đề xuất cho bạn</span>
                <span className="flex items-center gap-1 text-[11.5px] text-gray-400 font-normal">
                  <Eye size={12} /> Riêng tư
                </span>
              </div>
              <div className="px-4.5 pb-4 flex gap-3 items-start">
                <FileText size={28} className="text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[13.5px] font-semibold text-gray-900">
                    Thêm tóm tắt hồ sơ
                  </div>
                  <div className="text-[12px] text-gray-500 mt-0.5 leading-relaxed">
                    Hồ sơ có tóm tắt nhận được nhiều lượt xem hơn 3.9 lần
                  </div>
                  <button
                    className="mt-2 px-4 py-1.5 border-[1.5px] border-violet-600 rounded-full text-violet-600
                                     text-[12.5px] font-semibold bg-transparent cursor-pointer hover:bg-violet-600 hover:text-white transition-all"
                  >
                    Thêm tóm tắt
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* School */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4.5 pt-4 pb-3 text-[14px] font-semibold text-gray-900 flex items-center gap-2">
              <GraduationCap size={16} className="text-gray-400" />
              Trường học
            </div>
            <div className="px-4.5 pb-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-700 flex items-center justify-center text-[10px] font-extrabold text-white shrink-0">
                UIT
              </div>
              <div>
                <Link
                  href="/schools/uit"
                  className="text-[13.5px] font-semibold text-gray-900 hover:underline hover:text-violet-600 transition-colors"
                >
                  University of Information Technology
                </Link>
                <div className="text-[12px] text-gray-400 mt-0.5">
                  Management Information Systems · 2022–2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  Add Experience Modal  */}
      <AddExperienceModal
        open={addExpOpen}
        onClose={() => setAddExpOpen(false)}
        onSave={(data) => {
          console.log("New experience:", data);
        }}
      />
    </div>
  );
}