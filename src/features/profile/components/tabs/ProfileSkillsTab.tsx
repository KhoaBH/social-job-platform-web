"use client";

import { useMemo, useState } from "react";
import { Pencil, Globe, Link2 } from "lucide-react";
import ExperienceItem from "../shared/ExperienceItem";
import EducationItem from "../shared/EducationItem";
import SectionHead from "../shared/Sectionhead";
import AddExperienceModal from "../models/AddExperienceModal/index";
import {
  ProfileEducationView,
  ProfileExperienceView,
  ProfileSkillView,
  ProfileUserView,
  SKILL_LEVEL_LABELS,
  SkillOptionView,
} from "../../types";
import { ExperienceFormData } from "../models/AddExperienceModal/types";
import AddEducationModal from "../models/AddEducationModal/index";
import { EducationFormData } from "../models/AddEducationModal/types";
import AddSkillModal from "../models/AddSkillModal";
import { AddSkillFormData } from "../models/AddSkillModal/types";

const DEFAULT_CATEGORY = "Tất cả";

interface ProfileSkillsTabProps {
  user: ProfileUserView;
  experiences: ProfileExperienceView[];
  educations: ProfileEducationView[];
  skills: ProfileSkillView[];
  allSkills: SkillOptionView[];
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
}

export default function ProfileSkillsTab({
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
}: ProfileSkillsTabProps) {
  const u = user;
  const [activeSkillCat, setActiveSkillCat] = useState(DEFAULT_CATEGORY);
  const [addExpOpen, setAddExpOpen] = useState(false);
  const [addEduOpen, setAddEduOpen] = useState(false);
  const [addSkillOpen, setAddSkillOpen] = useState(false);

  const skillCategories = useMemo(() => {
    const categories = Array.from(
      new Set(skills.map((skill) => skill.category).filter(Boolean)),
    );

    return [DEFAULT_CATEGORY, ...categories];
  }, [skills]);

  const selectedSkillIds = useMemo(
    () => new Set(skills.map((skill) => skill.skillId)),
    [skills],
  );

  const availableSkillsToAdd = useMemo(
    () => allSkills.filter((skill) => !selectedSkillIds.has(skill.id)),
    [allSkills, selectedSkillIds],
  );

  const filtered =
    activeSkillCat === DEFAULT_CATEGORY
      ? skills
      : skills.filter((s) => s.category === activeSkillCat);

  const handleAddSkill = async (data: AddSkillFormData) => {
    await onCreateUserSkill(data);
    setAddSkillOpen(false);
  };

  return (
    <div className="animate-[fadeIn_0.2s_ease]">
      <div className="grid grid-cols-[1fr_300px] gap-4 max-[900px]:grid-cols-1">
        {/* ── Main column ── */}
        <div className="flex flex-col gap-3">
          {/* Experience */}
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <SectionHead
              title="Kinh nghiệm"
              showAdd={u.isOwner}
              onAdd={() => setAddExpOpen(true)}
              showEdit={u.isOwner}
            />
            {experiences.map((exp) => (
              <ExperienceItem 
                key={exp.id} 
                exp={exp} 
                compact={false}
                onEdit={u.isOwner ? onEditExperience : undefined}
              />
            ))}
            {!experiences.length && (
              <p className="text-[13px] text-gray-400">
                Chưa có kinh nghiệm làm việc.
              </p>
            )}
          </section>

          {/* Education */}
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <SectionHead
              title="Học vấn"
              showAdd={u.isOwner}
              onAdd={() => setAddEduOpen(true)}
              showEdit={u.isOwner}
            />
            {educations.map((edu) => (
              <EducationItem key={edu.id} edu={edu} compact={false} />
            ))}
            {!educations.length && (
              <p className="text-[13px] text-gray-400">
                Chưa có thông tin học vấn.
              </p>
            )}
          </section>

          {/* Skills */}
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <SectionHead
              title="Kỹ năng"
              showAdd={u.isOwner}
              onAdd={() => setAddSkillOpen(true)}
            />

            {/* Category filter */}
            <div className="flex gap-1.5 mb-3.5 flex-wrap">
              {skillCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveSkillCat(c)}
                  className={`px-3.5 py-1 rounded-full text-[12.5px] font-medium border-none cursor-pointer transition-all
                              ${
                                activeSkillCat === c
                                  ? "bg-violet-600 text-white"
                                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                              }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Skills list */}
            <div className="flex flex-col">
              {!filtered.length && (
                <p className="text-[13px] text-gray-400">Chưa có kỹ năng.</p>
              )}
              {filtered.map((sk) => (
                <div
                  key={sk.id}
                  className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <div className="text-[14px] font-medium text-gray-900">
                      {sk.name}
                    </div>
                    <div className="text-[12px] text-gray-400 mt-0.5">
                      {sk.category} · {SKILL_LEVEL_LABELS[sk.level]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Side column ── */}
        <div className="flex flex-col gap-3 max-[900px]:hidden">
          {/* Language */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="px-[18px] pt-4 pb-3 text-[14px] font-semibold text-gray-900 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Globe size={15} className="text-gray-400" />
                Ngôn ngữ
              </span>
              {u.isOwner && (
                <button className="w-7 h-7 flex items-center justify-center text-gray-400 bg-transparent border-none cursor-pointer rounded-full hover:bg-gray-100 transition-colors">
                  <Pencil size={13} />
                </button>
              )}
            </div>
            {[
              { name: "Tiếng Việt", level: "Ngôn ngữ mẹ đẻ" },
              { name: "English", level: "Trình độ làm việc chuyên nghiệp" },
            ].map((lang) => (
              <div key={lang.name} className="px-[18px] pb-2.5">
                <div className="text-[13.5px] font-semibold text-gray-900">
                  {lang.name}
                </div>
                <div className="text-[12px] text-gray-400">{lang.level}</div>
              </div>
            ))}
            <div className="pb-2" />
          </div>

          {/* Profile URL */}
          {u.isOwner && (
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="px-[18px] pt-4 pb-3 text-[14px] font-semibold text-gray-900 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Link2 size={15} className="text-gray-400" />
                  Hồ sơ công khai & URL
                </span>
                <button className="w-7 h-7 flex items-center justify-center text-gray-400 bg-transparent border-none cursor-pointer rounded-full hover:bg-gray-100 transition-colors">
                  <Pencil size={13} />
                </button>
              </div>
              <div className="px-[18px] pb-4 text-[13px] text-violet-600 font-medium">
                jub.vn/in/{u.username}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Experience Modal */}
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
        onSave={handleAddSkill}
      />
    </div>
  );
}
