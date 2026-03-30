"use client";

import { Image, Briefcase, FileText } from "lucide-react";

interface ComposerProps {
  initials: (name: string) => string;
  userFullName: string;
}

export default function Composer({ initials, userFullName }: ComposerProps) {
  return (
    <div className="bg-white border border-[#E4E4E7] rounded-[10px] p-4">
      {/* Top row */}
      <div className="flex items-center gap-2.5">
        <div className="w-11 h-11 rounded-full bg-[#0A66C2] flex items-center justify-center
                        text-base font-bold text-white shrink-0">
          {initials(userFullName)}
        </div>
        <input
          className="flex-1 h-11 border-[1.5px] border-[#C9CDD2] rounded-[22px] px-4
                     font-[inherit] text-[14px] text-[#666] cursor-pointer bg-transparent
                     outline-none transition-[border-color] duration-150
                     hover:border-[#0A66C2] focus:border-[#0A66C2]"
          placeholder="Bạn đang nghĩ gì? Chia sẻ với cộng đồng..."
        />
      </div>

      {/* Actions */}
      <div className="flex mt-2 pt-2 border-t border-[#E4E4E7]">
        {[
          { icon: <Image size={16} />, label: "Ảnh/Video" },
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
      </div>
    </div>
  );
}