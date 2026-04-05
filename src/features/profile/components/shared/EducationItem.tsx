"use client";

import { ProfileEducationView } from "../../types";

interface EducationItemProps {
  edu: ProfileEducationView;
  compact: boolean;
  onEdit?: (edu: ProfileEducationView) => void;
}

export default function EducationItem({ edu, compact, onEdit }: EducationItemProps) {
  return (
    <div 
      className="flex gap-3.5 py-3.5 border-b border-gray-100 last:border-b-0 last:pb-0 cursor-pointer hover:bg-gray-50 px-2 -mx-2 rounded transition-colors"
      onClick={() => onEdit?.(edu)}
    >
      {/* Logo */}
      <div
        className="w-11 h-11 rounded-xl shrink-0 flex items-center justify-center text-[10px] font-extrabold text-white"
        style={{ background: edu.schoolColor }}
      >
        {edu.schoolLogo}
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="text-[14.5px] font-semibold text-gray-900">
          {edu.school}
        </div>
        <div className="text-[13px] text-gray-500 mt-0.5">
          {edu.degree} · {edu.major}
        </div>
        <div className="text-[12px] text-gray-400 mt-0.5">
          {edu.startYear} – {edu.endYear}
        </div>

        {!compact && (
          <>
            <div className="text-[12px] text-gray-400">GPA: {edu.gpa}</div>
            <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">
              {edu.activities}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
