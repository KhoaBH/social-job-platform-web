"use client";

import { Globe,MoreHorizontal, Briefcase, ThumbsUp, MessageCircle, Share2, Send, } from "lucide-react";

interface Post {
  id: string;
  author: string;
  role: string;
  avatar: string;
  avatarColor: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  liked: boolean;
  isJob: boolean;
}

interface PostCardProps {
  post: Post;
  onToggleLike: (id: string) => void;
}

export default function PostCard({ post, onToggleLike }: PostCardProps) {
  return (
    <div className="bg-white border border-[#E4E4E7] rounded-[10px] overflow-hidden">
      {/* Header */}
      <div className="flex items-start gap-2.5 px-4 pt-3.5">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center
                     text-base font-bold text-white shrink-0"
          style={{ background: post.avatarColor }}
        >
          {post.avatar}
        </div>
        <div className="flex-1">
          <div className="text-[14px] font-bold">{post.author}</div>
          <div className="text-[12px] text-[#555] mt-px">{post.role}</div>
          <div className="text-[11.5px] text-[#999] mt-px flex items-center gap-1">
            <Globe size={12} />
            {post.time}
          </div>
        </div>
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
                     border-none bg-transparent text-[#666]
                     transition-[background] duration-100 hover:bg-[#F2F2F7]"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-3 text-[14px] leading-[1.65] whitespace-pre-line">
        {post.content}
      </div>

      {/* Job badge */}
      {post.isJob && (
        <div className="mx-4 mb-3 bg-[#EEF3F8] rounded-lg px-3.5 py-2.5
                        flex items-center gap-2 text-[13px] text-[#0A66C2] font-semibold">
          <Briefcase size={16} />
          Bài đăng tuyển dụng · Ứng tuyển ngay
        </div>
      )}

      {/* Stats */}
      <div className="px-4 pb-2 pt-1 flex justify-between text-[12px] text-[#666]">
        <span className="flex items-center gap-1">
          <ThumbsUp size={13} />
          {post.liked
            ? post.likes > 1
              ? `Bạn và ${post.likes - 1} người khác`
              : "Bạn"
            : `${post.likes} lượt thích`}
        </span>
        <span>{post.comments} bình luận</span>
      </div>

      {/* Actions */}
      <div className="border-t border-[#E4E4E7] flex">
        {[
          {
            icon: <ThumbsUp size={16} />,
            label: "Thích",
            action: () => onToggleLike(post.id),
            liked: post.liked,
          },
          {
            icon: <MessageCircle size={16} />,
            label: "Bình luận",
            action: () => {},
            liked: false,
          },
          {
            icon: <Share2 size={16} />,
            label: "Chia sẻ",
            action: () => {},
            liked: false,
          },
          {
            icon: <Send size={16} />,
            label: "Gửi",
            action: () => {},
            liked: false,
          },
        ].map(({ icon, label, action, liked }) => (
          <button
            key={label}
            onClick={action}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5
                        text-[13.5px] font-semibold cursor-pointer border-none
                        bg-transparent font-[inherit] transition-[background] duration-100
                        hover:bg-[#F2F2F7] hover:text-[#0A66C2]
                        ${liked ? "text-[#0A66C2]" : "text-[#666]"}`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}