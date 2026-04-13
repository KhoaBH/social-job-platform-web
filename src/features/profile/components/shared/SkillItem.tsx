"use client";

import { ProfileSkillView, SKILL_LEVEL_LABELS } from "../../types";
import { Star } from "lucide-react";

interface SkillItemProps {
  skill: ProfileSkillView;
  onEdit?: (skill: ProfileSkillView) => void;
  compact?: boolean;
}

const LEVEL_COLORS = {
  1: "bg-blue-50 border-blue-200",
  2: "bg-cyan-50 border-cyan-200",
  3: "bg-emerald-50 border-emerald-200",
  4: "bg-amber-50 border-amber-200",
  5: "bg-rose-50 border-rose-200",
};

const LEVEL_TEXT_COLORS = {
  1: "text-blue-700",
  2: "text-cyan-700",
  3: "text-emerald-700",
  4: "text-amber-700",
  5: "text-rose-700",
};

export default function SkillItem({ skill, onEdit, compact }: SkillItemProps) {
  const levelColor = LEVEL_COLORS[skill.level as keyof typeof LEVEL_COLORS];
  const levelTextColor = LEVEL_TEXT_COLORS[skill.level as keyof typeof LEVEL_TEXT_COLORS];

  if (compact) {
    return (
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-violet-50 to-purple-50 border border-violet-100 hover:border-violet-200 transition-all cursor-pointer group"
        onClick={() => onEdit?.(skill)}
      >
        <span className="text-[12.5px] font-medium text-gray-800 group-hover:text-violet-700">
          {skill.name}
        </span>
        <span className="bg-violet-600 text-white rounded-full px-1.5 text-[10px] font-bold">
          {SKILL_LEVEL_LABELS[skill.level]}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`border rounded-lg p-3.5 cursor-pointer transition-all ${levelColor} hover:shadow-md`}
      onClick={() => onEdit?.(skill)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className={`text-[14px] font-semibold ${levelTextColor}`}>
            {skill.name}
          </div>
          <div className="text-[12px] text-gray-500 mt-1">
            {skill.category}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < skill.level
                  ? `fill-current ${levelTextColor}`
                  : "text-gray-300"
              }
            />
          ))}
        </div>
      </div>
      <div className="mt-2 text-[11px] font-medium text-gray-600">
        {SKILL_LEVEL_LABELS[skill.level]} ({skill.level}/5)
      </div>
    </div>
  );
}