"use client";

interface Post {
  id: number;
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
  onToggleLike: (id: number) => void;
}

export default function PostCard({ post, onToggleLike }: PostCardProps) {
  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-ava" style={{ background: post.avatarColor }}>
          {post.avatar}
        </div>
        <div className="post-meta">
          <div className="post-author">{post.author}</div>
          <div className="post-role">{post.role}</div>
          <div className="post-time">🌐 {post.time}</div>
        </div>
        <button className="post-menu">···</button>
      </div>

      <div className="post-content">{post.content}</div>

      {post.isJob && (
        <div className="post-job-badge">💼 Bài đăng tuyển dụng · Ứng tuyển ngay</div>
      )}

      <div className="post-stats">
        <span>
          👍{" "}
          {post.liked
            ? post.likes > 1
              ? `Bạn và ${post.likes - 1} người khác`
              : "Bạn"
            : `${post.likes} lượt thích`}
        </span>
        <span>{post.comments} bình luận</span>
      </div>

      <div className="post-actions">
        <button
          className={`post-action${post.liked ? " liked" : ""}`}
          onClick={() => onToggleLike(post.id)}
        >
          👍 Thích
        </button>
        <button className="post-action">💬 Bình luận</button>
        <button className="post-action">↗️ Chia sẻ</button>
        <button className="post-action">📤 Gửi</button>
      </div>
    </div>
  );
}