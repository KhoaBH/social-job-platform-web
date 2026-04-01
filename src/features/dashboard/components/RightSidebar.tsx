"use client";

import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ArrowRight, UserPlus, Check } from "lucide-react";
import { RootState } from "@/store";
import { ROUTES } from "@/constants/routes";
import {
  useGetAllUsersQuery,
  useSendConnectionRequestMutation,
} from "../dashboardApi";
import { jobSuggestions, trendingTopics } from "../data/mockData";

export default function RightSidebar() {
  const [sentRequests, setSentRequests] = useState<string[]>([]);
  const [pendingRequestIds, setPendingRequestIds] = useState<string[]>([]);
  const authUser = useSelector((state: RootState) => state.auth.user);
  const {
    data: users = [],
    isLoading: isLoadingUsers,
    isError: isUsersError,
  } = useGetAllUsersQuery();
  const [sendConnectionRequest] = useSendConnectionRequestMutation();

  const suggestedConnections = users
    .filter((user) => user.id !== authUser?.id)
    .slice(0, 5)
    .map((user) => {
      const displayName =
        user.fullName || user.username || user.email || "Người dùng";
      const role =
        user.headline || user.profileText || user.username || "Thành viên JUB";
      const initials =
        displayName
          .split(" ")
          .filter(Boolean)
          .slice(-2)
          .map((part) => part[0]?.toUpperCase())
          .join("") || "U";

      const seed = displayName
        .split("")
        .reduce((sum, ch) => sum + ch.charCodeAt(0), 0);

      const colors = ["#F59E0B", "#EC4899", "#10B981", "#6366F1", "#0EA5E9"];
      return {
        id: user.id,
        name: displayName,
        role,
        avatar: initials,
        color: colors[seed % colors.length],
        mutual: (seed % 20) + 1,
      };
    });

  const handleSendFriendRequest = async (personId: string) => {
    if (
      pendingRequestIds.includes(personId) ||
      sentRequests.includes(personId)
    ) {
      return;
    }

    setPendingRequestIds((prev) => [...prev, personId]);
    try {
      await sendConnectionRequest({ addresseeId: personId }).unwrap();
      setSentRequests((prev) => [...prev, personId]);
    } catch {
      // Keep silent here; can be replaced by toast later.
    } finally {
      setPendingRequestIds((prev) => prev.filter((id) => id !== personId));
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      {/* Jobs */}
      <div className="bg-white border border-[#E4E4E7] rounded-[10px] overflow-hidden">
        <div className="text-[15px] font-bold px-4 pt-3.5 pb-2.5">
          Việc làm gợi ý
        </div>
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
            <button
              className="text-[12.5px] font-bold px-3.5 py-1.25 rounded-2xl
                               border-[1.5px] border-[#0A66C2] text-[#0A66C2] bg-transparent
                               cursor-pointer font-[inherit] shrink-0
                               transition-all duration-150 hover:bg-[#0A66C2] hover:text-white"
            >
              Nộp CV
            </button>
          </div>
        ))}
        <div
          className="flex items-center justify-center gap-1 px-2.5 py-2.5 border-t border-[#E4E4E7]
                        text-[13px] font-semibold text-[#0A66C2] cursor-pointer hover:bg-[#F2F2F7]"
        >
          Xem thêm <ArrowRight size={14} />
        </div>
      </div>

      {/* People */}
      <div className="bg-white border border-[#E4E4E7] rounded-[10px] overflow-hidden">
        <div className="text-[15px] font-bold px-4 pt-3.5 pb-2.5">
          Người bạn có thể biết
        </div>
        {isLoadingUsers && (
          <div className="px-4 py-3 border-t border-[#E4E4E7] text-[12px] text-[#666]">
            Đang tải danh sách người dùng...
          </div>
        )}
        {isUsersError && (
          <div className="px-4 py-3 border-t border-[#E4E4E7] text-[12px] text-red-500">
            Không tải được danh sách người dùng.
          </div>
        )}
        {!isLoadingUsers &&
          !isUsersError &&
          suggestedConnections.length === 0 && (
            <div className="px-4 py-3 border-t border-[#E4E4E7] text-[12px] text-[#666]">
              Chưa có gợi ý kết nối.
            </div>
          )}
        {!isLoadingUsers &&
          !isUsersError &&
          suggestedConnections.map((person) => (
            <div
              key={person.id}
              className="flex items-center gap-2.5 px-4 py-2.5 border-t border-[#E4E4E7]"
            >
              <Link
                href={ROUTES.PROTECTED.PROFILE.VIEW(person.id)}
                title="Xem hồ sơ"
                className="w-10 h-10 rounded-full flex items-center justify-center
                         text-[15px] font-bold text-white shrink-0 no-underline
                         transition-transform duration-150 hover:scale-105"
                style={{ background: person.color }}
              >
                {person.avatar}
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  href={ROUTES.PROTECTED.PROFILE.VIEW(person.id)}
                  title="Xem hồ sơ"
                  className="text-[13.5px] font-semibold truncate text-[#111827] no-underline hover:underline hover:text-[#0A66C2]"
                >
                  {person.name}
                </Link>
                <div className="text-[12px] text-[#666] truncate">
                  {person.role}
                </div>
                <div className="text-[11.5px] text-[#999]">
                  {person.mutual} kết nối chung
                </div>
              </div>
              <button
                onClick={() => handleSendFriendRequest(person.id)}
                disabled={
                  pendingRequestIds.includes(person.id) ||
                  sentRequests.includes(person.id)
                }
                className={`flex items-center gap-1 text-[12.5px] font-bold px-3.5 py-1.25 rounded-2xl border-[1.5px]
                          cursor-pointer font-[inherit] shrink-0 transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-70
                          ${
                            sentRequests.includes(person.id)
                              ? "border-[#C9CDD2] text-[#666] bg-[#F2F2F7]"
                              : "border-[#0A66C2] text-[#0A66C2] bg-transparent hover:bg-[#0A66C2] hover:text-white"
                          }`}
              >
                {pendingRequestIds.includes(person.id) ? (
                  <>Đang gửi...</>
                ) : sentRequests.includes(person.id) ? (
                  <>
                    <Check size={14} /> Đã gửi lời mời
                  </>
                ) : (
                  <>
                    <UserPlus size={14} /> Thêm bạn
                  </>
                )}
              </button>
            </div>
          ))}
        <div
          className="flex items-center justify-center gap-1 px-2.5 py-2.5 border-t border-[#E4E4E7]
                        text-[13px] font-semibold text-[#0A66C2] cursor-pointer hover:bg-[#F2F2F7]"
        >
          Xem tất cả <ArrowRight size={14} />
        </div>
      </div>

      {/* Trending */}
      <div className="bg-white border border-[#E4E4E7] rounded-[10px] overflow-hidden">
        <div className="text-[15px] font-bold px-4 pt-3.5 pb-2.5">
          Xu hướng hôm nay
        </div>
        {trendingTopics.map((t, i) => (
          <div
            key={i}
            className="px-4 py-2 border-t border-[#E4E4E7] cursor-pointer
                       transition-[background] duration-100 hover:bg-[#F8F8FC]"
          >
            <div className="text-[13.5px] font-semibold text-[#0A66C2]">
              {t.tag}
            </div>
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
