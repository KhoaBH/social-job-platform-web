"use client";

import { mockExperiences } from "../../data/profileMockData";

type Experience = (typeof mockExperiences)[0];

interface ExperienceItemProps {
  exp: Experience;
  compact: boolean;
}

export default function ExperienceItem({ exp, compact }: ExperienceItemProps) {
  return (
    <div className="flex gap-3.5 py-3.5 border-b border-gray-100 last:border-b-0 last:pb-0">
      {/* Logo */}
      <div
        className="w-11 h-11 rounded-xl shrink-0 flex items-center justify-center text-[15px] font-extrabold text-white"
        style={{ background: exp.companyColor }}
      >
        {exp.companyLogo}
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="text-[14.5px] font-semibold text-gray-900">{exp.title}</div>
        <div className="text-[13px] text-gray-500 mt-0.5">
          {exp.company} · {exp.type}
        </div>
        <div className="text-[12px] text-gray-400 mt-0.5">
          {exp.startDate} – {exp.endDate} · {exp.duration}
        </div>
        <div className="text-[12px] text-gray-400">📍 {exp.location}</div>

        {!compact && (
          <>
            <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">
              {exp.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {exp.skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-600 text-[11.5px] font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}