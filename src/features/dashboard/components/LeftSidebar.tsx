"use client";

import { Bookmark, ClipboardList, Users, Newspaper, GraduationCap, Star, } from "lucide-react";

interface LeftSidebarProps {
  initials: (name: string) => string;
  userFullName: string;
}

const shortcuts = [
  { icon: <Bookmark size={16} />, label: "Việc làm đã lưu" },
  { icon: <ClipboardList size={16} />, label: "Việc đã ứng tuyển" },
  { icon: <Users size={16} />, label: "Nhóm của tôi" },
  { icon: <Newspaper size={16} />, label: "Bản tin theo dõi" },
  { icon: <GraduationCap size={16} />, label: "Khoá học & Chứng chỉ" },
];

export default function LeftSidebar({ initials, userFullName }: LeftSidebarProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {/* Profile card */}
      <div className="bg-white border border-[#E4E4E7] rounded-[10px] overflow-hidden">
        {/* Cover */}
        <div className="h-14 bg-linear-to-br from-[#0A66C2] to-[#4FAAFF]" />

        {/* Body */}
        <div className="px-3.5 pb-3.5">
          {/* Avatar */}
          <div className="w-15 h-15 rounded-full bg-[#0A66C2] flex items-center justify-center
                          text-xl font-bold text-white border-[3px] border-white
                          -mt-7.5 mb-2">
            {initials(userFullName)}
          </div>

          <div className="text-[15px] font-bold">{userFullName || "Người dùng"}</div>
          <div className="text-[12px] text-[#555] mt-0.5 leading-[1.4]">
            Tìm việc tích cực · IT & Tech
          </div>

          <hr className="border-none border-t border-[#E4E4E7] my-2.5" />

          {[
            { label: "Người xem hồ sơ", value: "48" },
            { label: "Lượt hiển thị bài", value: "312" },
            { label: "Kết nối", value: "127" },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-[12.5px] py-0.5">
              <span className="text-[#555]">{label}</span>
              <span className="font-bold text-[#0A66C2]">{value}</span>
            </div>
          ))}

          <div className="flex items-center gap-1.5 mt-2.5 px-2.5 py-2 bg-[#FEF9EC]
                          rounded-lg text-[12px] text-[#8A6800] font-semibold cursor-pointer">
            <Star size={14} />
            Thử Jub Premium miễn phí
          </div>
        </div>
      </div>

      {/* Shortcuts */}
      <div className="bg-white border border-[#E4E4E7] rounded-[10px] py-2">
        {shortcuts.map((s, i) => (
          <button
            key={i}
            className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-[#444]
                       cursor-pointer border-none bg-transparent w-full text-left
                       font-[inherit] transition-[background] duration-100
                       hover:bg-[#F2F2F7] hover:text-[#0A66C2]"
          >
            <span>{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}