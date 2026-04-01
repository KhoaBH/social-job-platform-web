"use client";

import { useState } from "react";
import { Image as ImageIcon, Briefcase, FileText } from "lucide-react";

interface ComposerProps {
  initials: (name: string) => string;
  userFullName: string;
  onSubmit: (content: string) => Promise<void>;
  isSubmitting?: boolean;
}

export default function Composer({
  initials,
  userFullName,
  onSubmit,
  isSubmitting,
}: ComposerProps) {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const trimmed = content.trim();
    if (!trimmed || isSubmitting) {
      return;
    }

    await onSubmit(trimmed);
    setContent("");
  };

  return (
    <div className="bg-white border border-[#E4E4E7] rounded-[10px] p-4">
      {/* Top row */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-11 h-11 rounded-full bg-[#0A66C2] flex items-center justify-center
                        text-base font-bold text-white shrink-0"
        >
          {initials(userFullName)}
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={2}
          className="flex-1 min-h-11 border-[1.5px] border-[#C9CDD2] rounded-[16px] px-4 py-2
                     font-[inherit] text-[14px] text-[#1F2937] bg-transparent resize-none
                     outline-none transition-[border-color] duration-150
                     hover:border-[#0A66C2] focus:border-[#0A66C2]"
          placeholder="Bạn đang nghĩ gì? Chia sẻ với cộng đồng..."
        />
      </div>

      {/* Actions */}
      <div className="flex mt-2 pt-2 border-t border-[#E4E4E7] justify-between items-center">
        {[
          { icon: <ImageIcon size={16} />, label: "Ảnh/Video" },
          { icon: <Briefcase size={16} />, label: "Việc làm" },
          { icon: <FileText size={16} />, label: "Bài viết" },
        ].map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold
                       text-[#444] cursor-pointer border-none bg-transparent font-[inherit]
                       transition-[background] duration-100 hover:bg-[#F2F2F7]"
          >
            {item.icon}
            {item.label}
          </button>
        ))}

        <button
          onClick={handleSubmit}
          disabled={!content.trim() || isSubmitting}
          className="ml-auto px-4 py-2 rounded-full bg-[#0A66C2] text-white text-[13px] font-semibold
                     disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0958a8]"
        >
          {isSubmitting ? "Đang đăng..." : "Đăng"}
        </button>
      </div>
    </div>
  );
}
