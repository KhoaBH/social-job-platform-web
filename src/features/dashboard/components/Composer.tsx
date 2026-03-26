"use client";

interface ComposerProps {
  initials: (name: string) => string;
  userFullName: string;
}

export default function Composer({ initials, userFullName }: ComposerProps) {
  return (
    <div className="composer">
      <div className="composer-top">
        <div className="composer-ava">{initials(userFullName)}</div>
        <input
          className="composer-input"
          placeholder="Bạn đang nghĩ gì? Chia sẻ với cộng đồng..."
        />
      </div>
      <div className="composer-actions">
        <button className="composer-btn">📷 Ảnh/Video</button>
        <button className="composer-btn">💼 Việc làm</button>
        <button className="composer-btn">📝 Bài viết</button>
      </div>
    </div>
  );
}