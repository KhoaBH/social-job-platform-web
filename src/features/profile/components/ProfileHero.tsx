"use client";

import Link from "next/link";
import { MapPin, Pencil, ChevronRight } from "lucide-react";
// import { mockProfileUser } from "../data/profileMockData";
import { ProfileUserView, Tab, initials } from "../types";
import { ROUTES } from "@/constants/routes";

interface ProfileHeroProps {
  onTabChange: (t: Tab) => void;
  user: ProfileUserView;
  isLoading?: boolean;
}

export default function ProfileHero({
  onTabChange,
  user,
  isLoading,
}: ProfileHeroProps) {
  const u = user;

  return (
    <div className="bg-white rounded-2xl overflow-hidden mb-1 shadow-sm">
      {/* Cover */}
      <div
        className="h-40"
        style={{
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        }}
      />

      {/* Hero body */}
      <div className="px-7 pb-5 flex items-start justify-between gap-4">
        {/* Left: avatar + info */}
        <div className="flex gap-4 items-start">
          {/* Avatar */}
          <div className="relative shrink-0 -mt-11">
            <div
              className="w-22 h-22 rounded-full border-4 border-white flex items-center justify-center
                         text-[28px] font-bold text-white shadow-lg"
              style={{
                background: "#5B4FCF",
                fontFamily: "'DM Serif Display', serif",
                boxShadow: "0 4px 16px rgba(91,79,207,0.25)",
              }}
            >
              {isLoading ? "..." : initials(u.fullName)}
            </div>
            {/* {u.openToWork && (
              <div className="absolute -inset-1.5 rounded-full border-[3px] border-green-500 pointer-events-none" />
            )} */}
          </div>

          {/* Info */}
          <div className="pt-3">
            <div className="flex items-center gap-2">
              <h1
                className="text-2xl text-gray-900 tracking-tight"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontWeight: 400,
                }}
              >
                {u.fullName}
              </h1>
              {u.isOwner && (
                <button
                  className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 transition-colors bg-transparent border-none cursor-pointer"
                  aria-label="Chỉnh sửa tên"
                >
                  <Pencil size={14} />
                </button>
              )}
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                  u.isOwner
                    ? "bg-violet-100 text-violet-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {u.isOwner ? "Hồ sơ của bạn" : "Hồ sơ người khác"}
              </span>
            </div>
            <p className="text-[14px] text-gray-500 mt-1">{u.headline}</p>
            <p className="text-[13px] text-gray-400 mt-0.5 flex items-center gap-1">
              <MapPin size={12} className="shrink-0" />
              {u.location}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-2 mt-2">
              <button
                className="flex gap-1 items-baseline bg-transparent border-none cursor-pointer p-0"
                onClick={() => onTabChange("network")}
              >
                <span className="text-[14px] font-bold text-violet-600">
                  {u.connections}
                </span>
                <span className="text-[12px] text-gray-500">kết nối</span>
              </button>
              <span className="text-gray-300 text-sm">·</span>
              <button className="flex gap-1 items-baseline bg-transparent border-none cursor-pointer p-0">
                <span className="text-[14px] font-bold text-violet-600">
                  {u.followers}
                </span>
                <span className="text-[12px] text-gray-500">
                  người theo dõi
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 items-center pt-4 shrink-0">
          {u.isOwner ? (
            <>
              {/* Edit profile → internal page */}
              <Link
                href={ROUTES.PROTECTED.PROFILE.EDIT}
                className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-violet-600 text-white text-[13.5px] font-semibold
                           hover:bg-violet-700 hover:-translate-y-px hover:shadow-lg hover:shadow-violet-200
                           transition-all duration-150 whitespace-nowrap no-underline"
              >
                <Pencil size={13} />
                Chỉnh sửa hồ sơ
              </Link>
              <button
                className="flex items-center gap-1.5 px-[18px] py-[7px] rounded-full border-[1.5px] border-violet-600 text-violet-600
                           text-[13.5px] font-semibold hover:bg-violet-600 hover:text-white
                           transition-all duration-150 whitespace-nowrap bg-transparent cursor-pointer"
              >
                Thêm mục
              </button>
            </>
          ) : (
            <span className="px-3 py-1.5 rounded-full text-[12px] font-semibold bg-gray-100 text-gray-600 whitespace-nowrap">
              Chế độ chỉ xem
            </span>
          )}
        </div>
      </div>

      {/* Open to work banner */}
      {u.isOwner && u.openToWork && (
        <div
          className="mx-7 mb-5 px-4 py-3 bg-green-50 border-[1.5px] border-green-300 rounded-xl
                      flex items-center gap-2.5 text-[13px]"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
          <strong className="text-gray-800">
            Đang tìm kiếm cơ hội việc làm
          </strong>
          <span className="text-gray-500 ml-1">
            Thực tập Frontend · TP.HCM + Remote
          </span>
          <button className="ml-auto flex items-center gap-1 text-green-700 font-semibold bg-transparent border-none cursor-pointer text-[13px]">
            Xem chi tiết
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
