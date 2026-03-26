"use client";

interface LeftSidebarProps {
  initials: (name: string) => string;
  userFullName: string;
}

const shortcuts = [
  { icon: "📌", label: "Việc làm đã lưu" },
  { icon: "📋", label: "Việc đã ứng tuyển" },
  { icon: "👥", label: "Nhóm của tôi" },
  { icon: "📰", label: "Bản tin theo dõi" },
  { icon: "🎓", label: "Khoá học & Chứng chỉ" },
];

export default function LeftSidebar({ initials, userFullName }: LeftSidebarProps) {
  return (
    <div className="left-col">
      <div className="profile-card">
        <div className="profile-cover" />
        <div className="profile-body">
          <div className="profile-ava">{initials(userFullName)}</div>
          <div className="profile-name">{userFullName || "Người dùng"}</div>
          <div className="profile-role">Tìm việc tích cực · IT & Tech</div>
          <hr className="profile-divider" />
          <div className="profile-stat">
            <span>Người xem hồ sơ</span>
            <span>48</span>
          </div>
          <div className="profile-stat">
            <span>Lượt hiển thị bài</span>
            <span>312</span>
          </div>
          <div className="profile-stat">
            <span>Kết nối</span>
            <span>127</span>
          </div>
          <div className="profile-premium">⭐ Thử Jub Premium miễn phí</div>
        </div>
      </div>

      <div className="shortcut-card">
        {shortcuts.map((s, i) => (
          <button className="shortcut-item" key={i}>
            <span>{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}