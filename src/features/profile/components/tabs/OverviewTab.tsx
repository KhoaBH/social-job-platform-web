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
import ExperienceItem from "../shared/ExperienceItem";
import EducationItem from "../shared/EducationItem";
import SectionHead from "../shared/Sectionhead";
import {
  ProfileEducationView,
  ProfileExperienceView,
  ProfileSkillView,
  ProfileUserView,
  SKILL_LEVEL_LABELS,
  Tab,
} from "../../types";
// import AddExperienceModal from "../models/Addexperiencemodal";
import AddExperienceModal from "../models/AddExperienceModal/index";
import { ExperienceFormData } from "../models/AddExperienceModal/types";
import AddEducationModal from "../models/AddEducationModal/index";
import { EducationFormData } from "../models/AddEducationModal/types";
import AddSkillModal from "../models/AddSkillModal";
import { AddSkillFormData } from "../models/AddSkillModal/types";

interface OverviewTabProps {
  onTabChange: (t: Tab) => void;
  user: ProfileUserView;
  experiences: ProfileExperienceView[];
  educations: ProfileEducationView[];
  skills: ProfileSkillView[];
  allSkills: Array<{ id: string; name: string; category: string }>;
  companies: Array<{ id: string; name?: string | null }>;
  schools: Array<{ id: string; name?: string | null }>;
  fieldOfStudies: Array<{ id: string; name?: string | null }>;
  onCreateExperience: (data: ExperienceFormData) => Promise<void>;
  isCreatingExperience?: boolean;
  onCreateEducation: (data: EducationFormData) => Promise<void>;
  isCreatingEducation?: boolean;
  onCreateUserSkill: (data: AddSkillFormData) => Promise<void>;
  isCreatingUserSkill?: boolean;
  onEditExperience?: (exp: ProfileExperienceView) => void;
  onEditEducation?: (edu: ProfileEducationView) => void;
}

export default function OverviewTab({
  onTabChange,
  user,
  experiences,
  educations,
  skills,
  allSkills,
  companies,
  schools,
  fieldOfStudies,
  onCreateExperience,
  isCreatingExperience,
  onCreateEducation,
  isCreatingEducation,
  onCreateUserSkill,
  isCreatingUserSkill,
  onEditExperience,
  onEditEducation,
}: OverviewTabProps) {
  const u = user;
  const [addExpOpen, setAddExpOpen] = useState(false);
  const [addEduOpen, setAddEduOpen] = useState(false);
  const [addSkillOpen, setAddSkillOpen] = useState(false);
  const topSchool = educations[0];

  const selectedSkillIds = new Set(skills.map((skill) => skill.skillId));
  const availableSkillsToAdd = allSkills.filter(
    (skill) => !selectedSkillIds.has(skill.id),
  );

  const handleCreateSkill = async (data: AddSkillFormData) => {
    await onCreateUserSkill(data);
    setAddSkillOpen(false);
  };

  const analyticsItems = [
    { icon: <Users size={20} />, num: u.connections, label: "Bạn bè" },
    {
      icon: <BarChart2 size={20} />,
      num: u.followers,
      label: "Người theo dõi",
    },
    {
      icon: <Search size={20} />,
      num: 0,
      label: "Xuất hiện tìm kiếm (sớm)",
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
                href={`https://jub.vn/in/${u.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] text-violet-600 font-medium hover:underline"
              >
                <Link2 size={13} />
                {`jub.vn/in/${u.username}`}
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
            {experiences.map((exp) => (
              <ExperienceItem 
                key={exp.id} 
                exp={exp} 
                compact 
                onEdit={u.isOwner ? onEditExperience : undefined}
              />
            ))}
            {!experiences.length && (
              <p className="text-[13px] text-gray-400">
                Chưa có kinh nghiệm làm việc.
              </p>
            )}
          </section>

          {/* Education preview */}
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <SectionHead
              title="Học vấn"
              showAdd={u.isOwner}
              onAdd={() => setAddEduOpen(true)}
              onSeeAll={() => onTabChange("profile")}
            />
            {educations.map((edu) => (
              <EducationItem 
                key={edu.id} 
                edu={edu} 
                compact
                onEdit={u.isOwner ? onEditEducation : undefined}
              />
            ))}
            {!educations.length && (
              <p className="text-[13px] text-gray-400">
                Chưa có thông tin học vấn.
              </p>
            )}
          </section>

          {/* Skills preview */}
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <SectionHead
              title="Kỹ năng"
              showAdd={u.isOwner}
              onAdd={() => setAddSkillOpen(true)}
              onSeeAll={() => onTabChange("profile")}
            />
            <div className="flex flex-wrap gap-2">
              {!skills.length && (
                <p className="text-[13px] text-gray-400">Chưa có kỹ năng.</p>
              )}
              {skills.slice(0, 6).map((sk) => (
                <span
                  key={sk.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-violet-600 text-[12.5px] font-medium"
                >
                  {sk.name}
                  <span className="bg-violet-600 text-white rounded-full px-1.5 text-[10px] font-bold">
                    {SKILL_LEVEL_LABELS[sk.level]}
                  </span>
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
                {topSchool?.schoolLogo || "SCH"}
              </div>
              <div>
                <Link
                  href="/schools"
                  className="text-[13.5px] font-semibold text-gray-900 hover:underline hover:text-violet-600 transition-colors"
                >
                  {topSchool?.school || "Chưa cập nhật trường học"}
                </Link>
                <div className="text-[12px] text-gray-400 mt-0.5">
                  {topSchool
                    ? `${topSchool.major || ""} ${topSchool.startYear ? `· ${topSchool.startYear}` : ""}${topSchool.endYear ? `–${topSchool.endYear}` : ""}`
                    : "Thêm học vấn để hoàn thiện hồ sơ"}
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
        companies={companies}
        isSaving={isCreatingExperience}
        onSave={onCreateExperience}
      />

      <AddEducationModal
        open={addEduOpen}
        onClose={() => setAddEduOpen(false)}
        schools={schools}
        fieldOfStudies={fieldOfStudies}
        isSaving={isCreatingEducation}
        onSave={onCreateEducation}
      />

      <AddSkillModal
        open={addSkillOpen}
        onClose={() => setAddSkillOpen(false)}
        availableSkills={availableSkillsToAdd}
        isSaving={isCreatingUserSkill}
        onSave={handleCreateSkill}
      />
    </div>
  );
}
