"use client";

import { useState } from "react";
import { Plus, Pencil, ThumbsUp, Check, Globe, Link2 } from "lucide-react";
import { mockProfileUser, mockExperiences, mockEducation, mockSkills } from "../../data/profileMockData";
import ExperienceItem from "../shared/ExperienceItem";
import EducationItem from "../shared/EducationItem";
import SectionHead from "../shared/Sectionhead";

const SKILL_CATS = ["Tất cả", "Kỹ thuật", "Thiết kế", "Kỹ năng mềm"];

export default function ProfileSkillsTab() {
  const u = mockProfileUser;
  const [skills, setSkills] = useState(mockSkills);
  const [activeSkillCat, setActiveSkillCat] = useState("Tất cả");

  const filtered =
    activeSkillCat === "Tất cả"
      ? skills
      : skills.filter((s) => s.category === activeSkillCat);

  const toggleEndorse = (id: number) => {
    setSkills((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              endorsed: !s.endorsed,
              endorsements: s.endorsed ? s.endorsements - 1 : s.endorsements + 1,
            }
          : s
      )
    );
  };

  return (
    <div className="animate-[fadeIn_0.2s_ease]">
      <div className="grid grid-cols-[1fr_300px] gap-4 max-[900px]:grid-cols-1">

        {/* ── Main column ── */}
        <div className="flex flex-col gap-3">

          {/* Experience */}
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <SectionHead title="Kinh nghiệm" showAdd={u.isOwner} showEdit={u.isOwner} />
            {mockExperiences.map((exp) => (
              <ExperienceItem key={exp.id} exp={exp} compact={false} />
            ))}
            {u.isOwner && (
              <button className="mt-3 w-full py-2.5 border-[1.5px] border-dashed border-violet-300 rounded-xl
                                 text-violet-600 text-[13.5px] font-semibold bg-gray-50 cursor-pointer
                                 hover:bg-violet-50 transition-all flex items-center justify-center gap-1.5">
                <Plus size={15} />
                Thêm kinh nghiệm
              </button>
            )}
          </section>

          {/* Education */}
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <SectionHead title="Học vấn" showAdd={u.isOwner} showEdit={u.isOwner} />
            {mockEducation.map((edu) => (
              <EducationItem key={edu.id} edu={edu} compact={false} />
            ))}
          </section>

          {/* Skills */}
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <SectionHead title="Kỹ năng" showAdd={u.isOwner} />

            {/* Category filter */}
            <div className="flex gap-1.5 mb-3.5 flex-wrap">
              {SKILL_CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveSkillCat(c)}
                  className={`px-3.5 py-1 rounded-full text-[12.5px] font-medium border-none cursor-pointer transition-all
                              ${activeSkillCat === c
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
              {filtered.map((sk) => (
                <div
                  key={sk.id}
                  className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <div className="text-[14px] font-medium text-gray-900">{sk.name}</div>
                    <div className="text-[12px] text-gray-400 mt-0.5">
                      {sk.category} · {sk.endorsements} xác nhận
                    </div>
                  </div>
                  {!u.isOwner && (
                    <button
                      onClick={() => toggleEndorse(sk.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[12.5px] font-semibold border-[1.5px] cursor-pointer transition-all
                                  ${sk.endorsed
                                    ? "bg-violet-600 text-white border-violet-600"
                                    : "bg-transparent text-gray-500 border-gray-300 hover:border-violet-600 hover:text-violet-600"
                                  }`}
                    >
                      {sk.endorsed
                        ? <><Check size={13} /> Đã xác nhận</>
                        : <><ThumbsUp size={13} /> Xác nhận</>
                      }
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Side column ── */}
        <div className="flex flex-col gap-3 max-[900px]:hidden">

          {/* Language */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4.5 pt-4 pb-3 text-[14px] font-semibold text-gray-900 flex items-center justify-between">
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
              <div key={lang.name} className="px-4.5 pb-2.5">
                <div className="text-[13.5px] font-semibold text-gray-900">{lang.name}</div>
                <div className="text-[12px] text-gray-400">{lang.level}</div>
              </div>
            ))}
            <div className="pb-2" />
          </div>

          {/* Profile URL */}
          {u.isOwner && (
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4.5 pt-4 pb-3 text-[14px] font-semibold text-gray-900 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Link2 size={15} className="text-gray-400" />
                  Hồ sơ công khai & URL
                </span>
                <button className="w-7 h-7 flex items-center justify-center text-gray-400 bg-transparent border-none cursor-pointer rounded-full hover:bg-gray-100 transition-colors">
                  <Pencil size={13} />
                </button>
              </div>
              <div className="px-4.5 pb-4 text-[13px] text-violet-600 font-medium">
                jub.vn/in/{u.username}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}