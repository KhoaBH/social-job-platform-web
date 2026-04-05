"use client";

import { useState } from "react";
import {
  Plus,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Share2,
  Heart,
  Users,
  ArrowRight,
} from "lucide-react";
import { mockProfileUser, mockPosts } from "../../data/profileMockData";
import { initials } from "../../profile.utils";
const recentActivities = [
  {
    icon: <Heart size={16} className="text-rose-500" />,
    text: "Jane Đặng đã thích bài viết của bạn",
    time: "2 giờ trước",
  },
  {
    icon: <MessageCircle size={16} className="text-blue-500" />,
    text: "Minh Tuấn đã bình luận bài viết của bạn",
    time: "5 giờ trước",
  },
  {
    icon: <Users size={16} className="text-violet-500" />,
    text: "Lan Anh đã trở thành bạn bè với bạn",
    time: "1 ngày trước",
  },
];

export default function ActivityTab() {
  const u = mockProfileUser;
  const [posts, setPosts] = useState(mockPosts);

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p,
      ),
    );
  };

  return (
    <div className="animate-[fadeIn_0.2s_ease]">
      <div className="grid grid-cols-[1fr_300px] gap-4 max-[900px]:grid-cols-1">
        {/* ── Main column ── */}
        <div className="flex flex-col gap-3">
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            {/* Header — SectionHead không có nút "Xem tất cả" ở đây,
                nên render thủ công để gắn button "Tạo bài đăng" riêng */}
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-lg text-gray-900"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontWeight: 400,
                }}
              >
                Bài đăng của tôi
              </h2>
              {u.isOwner && (
                <button
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-violet-600 text-white
                             text-[12px] font-semibold hover:bg-violet-700 transition-all cursor-pointer border-none"
                >
                  <Plus size={13} />
                  Tạo bài đăng
                </button>
              )}
            </div>

            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-50 rounded-xl overflow-hidden mb-3 last:mb-0 border border-gray-200"
              >
                {/* Post header */}
                <div className="flex items-center gap-2.5 px-4 pt-3.5 pb-2.5">
                  <div
                    className="w-9 h-9 rounded-full bg-violet-600 text-white text-[12px] font-bold
                                flex items-center justify-center shrink-0"
                  >
                    {initials(u.fullName)}
                  </div>
                  <div className="flex-1">
                    <div className="text-[13.5px] font-semibold text-gray-900">
                      {u.fullName}
                    </div>
                    <div className="text-[12px] text-gray-400">{post.time}</div>
                  </div>
                  {u.isOwner && (
                    <button className="ml-auto bg-transparent border-none cursor-pointer text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  )}
                </div>

                {/* Content */}
                <p className="px-4 pb-3 text-[14px] text-gray-600 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>

                {/* Stats */}
                <div
                  className="px-4 py-2 text-[12px] text-gray-400 flex justify-between
                              border-t border-gray-200 border-b border-b-gray-200"
                >
                  <span className="flex items-center gap-1">
                    <ThumbsUp size={11} />
                    {post.likes} lượt thích
                  </span>
                  <span>
                    {post.comments} bình luận · {post.shares} chia sẻ
                  </span>
                </div>

                {/* Actions */}
                <div className="flex">
                  {[
                    {
                      icon: <ThumbsUp size={14} />,
                      label: "Thích",
                      liked: post.liked,
                      action: () => toggleLike(post.id),
                    },
                    {
                      icon: <MessageCircle size={14} />,
                      label: "Bình luận",
                      liked: false,
                      action: () => {},
                    },
                    {
                      icon: <Share2 size={14} />,
                      label: "Chia sẻ",
                      liked: false,
                      action: () => {},
                    },
                  ].map(({ icon, label, liked, action }) => (
                    <button
                      key={label}
                      onClick={action}
                      className={`flex-1 py-2.5 text-[13px] font-semibold flex items-center justify-center gap-1.5
                                  bg-transparent border-none cursor-pointer transition-all
                                  ${
                                    liked
                                      ? "text-violet-600"
                                      : "text-gray-500 hover:bg-gray-100 hover:text-violet-600"
                                  }`}
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* ── Side column ── */}
        <div className="flex flex-col gap-3 max-[900px]:hidden">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="px-[18px] pt-4 pb-3 text-[14px] font-semibold text-gray-900">
              Hoạt động gần đây
            </div>
            {recentActivities.map((a, i) => (
              <div
                key={i}
                className="px-[18px] py-2.5 border-t border-gray-100 flex items-start gap-2.5"
              >
                <span className="shrink-0 mt-0.5">{a.icon}</span>
                <div>
                  <div className="text-[13px] text-gray-700 leading-relaxed">
                    {a.text}
                  </div>
                  <div className="text-[11.5px] text-gray-400 mt-0.5">
                    {a.time}
                  </div>
                </div>
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
