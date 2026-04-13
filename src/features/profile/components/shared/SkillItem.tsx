"use client";

import { ProfileSkillView } from "../../types";

interface SkillItemProps {
  skill: ProfileSkillView;
  onEdit?: (skill: ProfileSkillView) => void;
}

export default function SkillItem({ skill, onEdit }: SkillItemProps) {
  return (
    <div
      className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 px-2 -mx-2 rounded transition-colors"
      onClick={() => onEdit?.(skill)}
    >
      <div>
        <div className="text-[14px] font-medium text-gray-900">
          {skill.name}
        </div>
        <div className="text-[12px] text-gray-400 mt-0.5">
          {skill.category}
        </div>
      </div>
      <div className="text-[12px] text-gray-500 font-medium">
        {skill.level}/5
      </div>
    </div>
  );
}
