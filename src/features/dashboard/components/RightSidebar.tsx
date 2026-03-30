"use client";

import { useState } from "react";
import { ArrowRight, UserPlus, Check, } from "lucide-react";
import { jobSuggestions, suggestedConnections, trendingTopics, } from "../data/mockData";

export default function RightSidebar() {
  const [connected, setConnected] = useState<number[]>([]);

  return (
    <div className="flex flex-col gap-2.5">

      {/* Jobs */}
      <div className="bg-white border border-[#E4E4E7] rounded-[10px] overflow-hidden">
        <div className="text-[15px] font-bold px-4 pt-3.5 pb-2.5">Việc làm gợi ý</div>
        {jobSuggestions.map((job, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-2.5 border-t border-[#E4E4E7]
                       cursor-pointer transition-[background] duration-100 hover:bg-[#F8F8FC]"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center
                         text-base font-extrabold text-white shrink-0"
              style={{ background: job.color }}
            >
              {job.logo}
            </div>
            <div className="flex-1">
              <div className="text-[13.5px] font-semibold">{job.title}</div>
              <div className="text-[12px] text-[#666]">{job.company}</div>
              <div className="text-[11.5px] text-[#0A66C2] font-semibold mt-0.5">
                {job.salary}/tháng
              </div>
            </div>
            <button className="text-[12.5px] font-bold px-3.5 py-1.25 rounded-2xl
                               border-[1.5px] border-[#0A66C2] text-[#0A66C2] bg-transparent
                               cursor-pointer font-[inherit] shrink-0
                               transition-all duration-150 hover:bg-[#0A66C2] hover:text-white">
              Nộp CV
            </button>
          </div>
        ))}
        <div className="flex items-center justify-center gap-1 px-2.5 py-2.5 border-t border-[#E4E4E7]
                        text-[13px] font-semibold text-[#0A66C2] cursor-pointer hover:bg-[#F2F2F7]">
          Xem thêm <ArrowRight size={14} />
        </div>
      </div>

      {/* People */}
      <div className="bg-white border border-[#E4E4E7] rounded-[10px] overflow-hidden">
        <div className="text-[15px] font-bold px-4 pt-3.5 pb-2.5">Người bạn có thể biết</div>
        {suggestedConnections.map((person, i) => (
          <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 border-t border-[#E4E4E7]">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center
                         text-[15px] font-bold text-white shrink-0"
              style={{ background: person.color }}
            >
              {person.avatar}
            </div>
            <div className="flex-1">
              <div className="text-[13.5px] font-semibold">{person.name}</div>
              <div className="text-[12px] text-[#666]">{person.role}</div>
              <div className="text-[11.5px] text-[#999]">{person.mutual} kết nối chung</div>
            </div>
            <button
              onClick={() =>
                setConnected((prev) =>
                  prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
                )
              }
              className={`flex items-center gap-1 text-[12.5px] font-bold px-3.5 py-1.25 rounded-2xl border-[1.5px]
                          cursor-pointer font-[inherit] shrink-0 transition-all duration-150
                          ${
                            connected.includes(i)
                              ? "border-[#C9CDD2] text-[#666] bg-[#F2F2F7]"
                              : "border-[#0A66C2] text-[#0A66C2] bg-transparent hover:bg-[#0A66C2] hover:text-white"
                          }`}
            >
              {connected.includes(i) ? (
                <>
                  <Check size={14} /> Đã kết nối
                </>
              ) : (
                <>
                  <UserPlus size={14} /> Kết nối
                </>
              )}
            </button>
          </div>
        ))}
        <div className="flex items-center justify-center gap-1 px-2.5 py-2.5 border-t border-[#E4E4E7]
                        text-[13px] font-semibold text-[#0A66C2] cursor-pointer hover:bg-[#F2F2F7]">
          Xem tất cả <ArrowRight size={14} />
        </div>
      </div>

      {/* Trending */}
      <div className="bg-white border border-[#E4E4E7] rounded-[10px] overflow-hidden">
        <div className="text-[15px] font-bold px-4 pt-3.5 pb-2.5">Xu hướng hôm nay</div>
        {trendingTopics.map((t, i) => (
          <div
            key={i}
            className="px-4 py-2 border-t border-[#E4E4E7] cursor-pointer
                       transition-[background] duration-100 hover:bg-[#F8F8FC]"
          >
            <div className="text-[13.5px] font-semibold text-[#0A66C2]">{t.tag}</div>
            <div className="text-[11.5px] text-[#999] mt-px">{t.count}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-[11px] text-[#999] leading-[1.9] py-1">
        Giới thiệu · Điều khoản · Chính sách · Cookie
        <br />© 2026 Jub Vietnam
      </div>
    </div>
  );
}