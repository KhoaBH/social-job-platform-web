"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UserCheck,
  UserPlus,
  Check,
  Plus,
  ArrowRight,
  Users,
} from "lucide-react";
import { mockConnections, mockInterests } from "../../data/profileMockData";

const INTEREST_TABS = ["Công ty", "Nhóm", "Bản tin"];

export default function NetworkTab() {
  const [connected, setConnected] = useState<number[]>([]);
  const [interests, setInterests] = useState(mockInterests);
  const [activeIntTab, setActiveIntTab] = useState("Công ty");

  const toggleConnect = (id: number) =>
    setConnected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const toggleFollow = (id: number) =>
    setInterests((prev) =>
      prev.map((i) => (i.id === id ? { ...i, following: !i.following } : i)),
    );

  return (
    <div className="animate-[fadeIn_0.2s_ease]">
      <div className="grid grid-cols-[1fr_300px] gap-4 max-[900px]:grid-cols-1">
        {/* ── Main column ── */}
        <div className="flex flex-col gap-3">
          {/* Connections grid */}
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-lg text-gray-900"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontWeight: 400,
                }}
              >
                Kết nối ({mockConnections.length})
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-3 max-[600px]:grid-cols-2">
              {mockConnections.map((person) => (
                <div
                  key={person.id}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-4
                             flex flex-col items-center text-center gap-1
                             hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
                >
                  <div
                    className="w-13 h-13 rounded-full flex items-center justify-center
                               text-[18px] font-bold text-white mb-1.5"
                    style={{ background: person.color }}
                  >
                    {person.avatar}
                  </div>
                  {/* Tên người dùng → Link đến trang profile của họ */}
                  <Link
                    href={`/profile/${person.id}`}
                    className="text-[13px] font-semibold text-gray-900 leading-tight hover:text-violet-600 hover:underline transition-colors"
                  >
                    {person.name}
                  </Link>
                  <div className="text-[11.5px] text-gray-500 leading-snug">
                    {person.role}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <Users size={11} />
                    {person.mutual} kết nối chung
                  </div>
                  <button
                    onClick={() => toggleConnect(person.id)}
                    className={`mt-2 flex items-center gap-1 px-3.5 py-1 rounded-full text-[12px] font-semibold border-[1.5px] cursor-pointer transition-all
                                ${
                                  connected.includes(person.id)
                                    ? "bg-gray-100 border-gray-300 text-gray-500"
                                    : "border-violet-600 text-violet-600 bg-transparent hover:bg-violet-600 hover:text-white"
                                }`}
                  >
                    {connected.includes(person.id) ? (
                      <>
                        <Check size={12} /> Đã kết nối
                      </>
                    ) : (
                      <>
                        <UserPlus size={12} /> Kết nối
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Interests */}
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2
                className="text-lg text-gray-900"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontWeight: 400,
                }}
              >
                Mối quan tâm
              </h2>
            </div>

            {/* Interest type tabs */}
            <div className="flex gap-2 mb-3">
              {INTEREST_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveIntTab(tab)}
                  className={`px-4 py-1 rounded-full text-[12.5px] font-medium border-none cursor-pointer transition-all
                              ${
                                activeIntTab === tab
                                  ? "bg-violet-600 text-white"
                                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                              }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Interest list */}
            <div className="flex flex-col">
              {interests.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div
                    className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-[15px] font-extrabold text-white shrink-0"
                    style={{ background: item.color }}
                  >
                    {item.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* Tên công ty → Link đến trang company */}
                    <Link
                      href={`/companies/${item.id}`}
                      className="text-[13.5px] font-semibold text-gray-900 hover:text-violet-600 hover:underline transition-colors"
                    >
                      {item.name}
                    </Link>
                    <div className="text-[12px] text-gray-400">
                      {item.followers} người theo dõi
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFollow(item.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[12.5px] font-semibold border-[1.5px] cursor-pointer transition-all whitespace-nowrap
                                ${
                                  item.following
                                    ? "bg-violet-600 text-white border-violet-600"
                                    : "border-violet-600 text-violet-600 bg-transparent hover:bg-violet-600 hover:text-white"
                                }`}
                  >
                    {item.following ? (
                      <>
                        <Check size={13} /> Đang theo dõi
                      </>
                    ) : (
                      <>
                        <Plus size={13} /> Theo dõi
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
            <button
              className="w-full flex items-center justify-center gap-1 pt-3 text-[13px] font-semibold text-violet-600
                         bg-transparent border-none cursor-pointer hover:underline"
            >
              Xem tất cả <ArrowRight size={13} />
            </button>
          </section>
        </div>

        {/* ── Side column ── */}
        <div className="flex flex-col gap-3 max-[900px]:hidden">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="px-[18px] pt-4 pb-3 text-[14px] font-semibold text-gray-900">
              Người bạn có thể biết
            </div>
            {mockConnections.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-2.5 px-[18px] py-2.5 border-t border-gray-100"
              >
                <div
                  className="w-[38px] h-[38px] rounded-full shrink-0 flex items-center justify-center text-[13px] font-bold text-white"
                  style={{ background: p.color }}
                >
                  {p.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  {/* Tên → Link đến profile */}
                  <Link
                    href={`/profile/${p.id}`}
                    className="block text-[13px] font-semibold text-gray-900 truncate hover:text-violet-600 hover:underline transition-colors"
                  >
                    {p.name}
                  </Link>
                  <div className="text-[11.5px] text-gray-400 truncate">
                    {p.role}
                  </div>
                </div>
                <button
                  onClick={() => toggleConnect(p.id)}
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-[1.5px] cursor-pointer transition-all shrink-0
                              ${
                                connected.includes(p.id)
                                  ? "bg-gray-100 border-gray-300 text-gray-500"
                                  : "border-violet-600 text-violet-600 bg-transparent hover:bg-violet-600 hover:text-white"
                              }`}
                >
                  {connected.includes(p.id) ? (
                    <UserCheck size={14} />
                  ) : (
                    <UserPlus size={14} />
                  )}
                </button>
              </div>
            ))}
            <button
              className="w-full flex items-center justify-center gap-1 py-3 border-t border-gray-100
                         text-[13px] font-semibold text-violet-600 bg-transparent border-l-0 border-r-0 border-b-0
                         cursor-pointer hover:bg-gray-50 transition-colors"
            >
              Xem tất cả <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
