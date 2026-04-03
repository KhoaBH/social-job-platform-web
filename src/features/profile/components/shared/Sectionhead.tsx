"use client";

import { Pencil, Plus, ArrowRight } from "lucide-react";

interface SectionHeadProps {
  title: string;
  onSeeAll?: () => void;
  onAdd?: () => void;
  showAdd?: boolean;
  showEdit?: boolean;
  addLabel?: string;
}

export default function SectionHead({
  title,
  onSeeAll,
  onAdd,
  showAdd,
  showEdit,
  addLabel,
}: SectionHeadProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2
        className="text-lg text-gray-900"
        style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}
      >
        {title}
      </h2>
      <div className="flex items-center gap-1.5">
        {showAdd &&
          (addLabel ? (
            <button
              onClick={onAdd}
              className="flex items-center gap-0.5 text-[12.5px] font-semibold text-violet-600
                       bg-transparent border-none cursor-pointer hover:underline"
            >
              <Plus size={13} /> {addLabel}
            </button>
          ) : (
            <button
              onClick={onAdd}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400
                       hover:bg-gray-100 transition-colors bg-transparent border-none cursor-pointer"
            >
              <Plus size={16} />
            </button>
          ))}
        {showEdit && (
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400
                             hover:bg-gray-100 transition-colors bg-transparent border-none cursor-pointer"
          >
            <Pencil size={14} />
          </button>
        )}
        {onSeeAll && (
          <button
            onClick={onSeeAll}
            className="flex items-center gap-0.5 text-[12.5px] font-semibold text-violet-600
                       bg-transparent border-none cursor-pointer hover:underline"
          >
            Xem tất cả <ArrowRight size={13} />
          </button>
        )}
      </div>
    </div>
  );
}
