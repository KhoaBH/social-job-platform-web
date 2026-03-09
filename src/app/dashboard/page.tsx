"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

// ── Mock Data ──────────────────────────────────────────────────────────────────
const mockPosts = [
  {
    id: 1,
    author: "Nguyễn Minh Tuấn",
    role: "Senior Frontend Engineer tại Tiki",
    avatar: "T",
    avatarColor: "#FF6B35",
    time: "2 giờ trước",
    content:
      "Vừa hoàn thành dự án migration từ CRA sang Next.js 15 cho một e-commerce lớn. Hiệu suất tăng đáng kể — LCP giảm từ 4.2s xuống còn 1.1s 🚀\n\nMột số bài học rút ra sau 3 tháng làm dự án này mà mình muốn chia sẻ với anh em dev...",
    likes: 218,
    comments: 34,
    liked: false,
    isJob: false,
  },
  {
    id: 2,
    author: "Trần Thị Lan Anh",
    role: "Product Manager tại MoMo",
    avatar: "L",
    avatarColor: "#8B5CF6",
    time: "5 giờ trước",
    content:
      "🔥 MoMo đang tuyển dụng Senior Backend Engineer (Node.js / Go)!\n\nLương: 40–70 triệu/tháng\n📍 TP.HCM hoặc Remote\n\nNếu bạn có kinh nghiệm với distributed systems và muốn làm việc trong môi trường scale lớn, inbox mình nhé!",
    likes: 142,
    comments: 67,
    liked: true,
    isJob: true,
  },
  {
    id: 3,
    author: "Phạm Đức Anh",
    role: "Tech Lead tại FPT Software",
    avatar: "Đ",
    avatarColor: "#0EA5E9",
    time: "1 ngày trước",
    content:
      "Sau 5 năm làm việc trong ngành tech, điều mình nhận ra là kỹ năng mềm quan trọng không kém gì kỹ năng lập trình.\n\nCommunication, ownership, và khả năng học hỏi nhanh — đây là 3 thứ phân biệt một developer bình thường với một developer xuất sắc.",
    likes: 503,
    comments: 89,
    liked: false,
    isJob: false,
  },
];

const suggestedConnections = [
  {
    name: "Lê Văn Hùng",
    role: "DevOps Engineer · AWS",
    avatar: "H",
    color: "#F59E0B",
    mutual: 12,
  },
  {
    name: "Ngô Thanh Hà",
    role: "UX Designer · Figma",
    avatar: "H",
    color: "#EC4899",
    mutual: 8,
  },
  {
    name: "Đinh Quốc Bảo",
    role: "Data Engineer · Spark",
    avatar: "B",
    color: "#10B981",
    mutual: 5,
  },
];

const jobSuggestions = [
  {
    title: "Frontend Developer",
    company: "Shopee",
    salary: "30–50tr",
    logo: "S",
    color: "#EE4D2D",
  },
  {
    title: "React Native Dev",
    company: "VNG",
    salary: "35–55tr",
    logo: "V",
    color: "#0066FF",
  },
  {
    title: "UI/UX Designer",
    company: "Zalo",
    salary: "25–40tr",
    logo: "Z",
    color: "#0068FF",
  },
];

const navLinks = [
  { label: "Trang chủ", icon: "🏠" },
  { label: "Việc làm", icon: "💼" },
  { label: "Mạng lưới", icon: "👥" },
  { label: "Tin nhắn", icon: "💬" },
  { label: "Thông báo", icon: "🔔" },
];

// ── Component ──────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [posts, setPosts] = useState(mockPosts);
  const [activeNav, setActiveNav] = useState(0);
  const [connected, setConnected] = useState<number[]>([]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

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

  const initials = (name: string) =>
    name
      ? name
          .split(" ")
          .map((w) => w[0])
          .slice(-2)
          .join("")
      : "U";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .jub { font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; background: #F2F2F7; color: #1a1a1a; }

        /* Topbar */
        .jub-nav {
          background: #fff; border-bottom: 1px solid #E4E4E7;
          position: sticky; top: 0; z-index: 100;
          height: 56px; display: flex; align-items: center; padding: 0 16px;
        }
        .nav-inner {
          max-width: 1128px; width: 100%; margin: 0 auto;
          display: flex; align-items: center; gap: 0;
        }
        .nav-logo { font-size: 22px; font-weight: 700; color: #0A66C2; letter-spacing: -0.5px; margin-right: 12px; }
        .nav-search {
          display: flex; align-items: center; gap: 8px;
          background: #EEF3F8; border-radius: 6px;
          padding: 0 12px; height: 34px; width: 220px; flex-shrink: 0;
        }
        .nav-search input { background: none; border: none; outline: none; font-family: inherit; font-size: 13.5px; color: #1a1a1a; width: 100%; }
        .nav-search input::placeholder { color: #888; }
        .nav-links { display: flex; align-items: center; margin-left: auto; gap: 4px; }
        .nav-link {
          display: flex; flex-direction: column; align-items: center; gap: 2px;
          padding: 0 16px; height: 56px; justify-content: center;
          font-size: 11.5px; color: #666; cursor: pointer;
          border: none; border-bottom: 2px solid transparent;
          background: none; font-family: inherit; transition: all 0.15s;
        }
        .nav-link .nl-icon { font-size: 20px; line-height: 1; }
        .nav-link:hover { color: #1a1a1a; }
        .nav-link.active { color: #1a1a1a; border-bottom: 2px solid #1a1a1a; }
        .nav-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; color: #fff;
          background: #0A66C2; cursor: pointer; flex-shrink: 0; margin-left: 8px;
        }
        .nav-logout {
          margin-left: 8px; padding: 6px 14px; font-size: 12.5px; font-weight: 600;
          color: #666; border: 1.5px solid #C9CDD2; border-radius: 16px;
          background: none; cursor: pointer; font-family: inherit; transition: all 0.15s;
        }
        .nav-logout:hover { border-color: #1a1a1a; color: #1a1a1a; }

        /* Layout */
        .jub-body {
          max-width: 1128px; margin: 0 auto; padding: 24px 16px;
          display: grid; grid-template-columns: 225px 1fr 300px; gap: 20px;
        }

        /* Left */
        .left-col { display: flex; flex-direction: column; gap: 10px; }

        .profile-card {
          background: #fff; border: 1px solid #E4E4E7;
          border-radius: 10px; overflow: hidden;
        }
        .profile-cover { height: 56px; background: linear-gradient(135deg, #0A66C2, #4FAAFF); }
        .profile-body { padding: 0 14px 14px; }
        .profile-ava {
          width: 60px; height: 60px; border-radius: 50%;
          background: #0A66C2; display: flex; align-items: center; justify-content: center;
          font-size: 20px; font-weight: 700; color: #fff;
          border: 3px solid #fff; margin-top: -30px; margin-bottom: 8px;
        }
        .profile-name { font-size: 15px; font-weight: 700; }
        .profile-role { font-size: 12px; color: #555; margin-top: 2px; line-height: 1.4; }
        .profile-divider { border: none; border-top: 1px solid #E4E4E7; margin: 10px 0; }
        .profile-stat { display: flex; justify-content: space-between; font-size: 12.5px; padding: 2px 0; }
        .profile-stat span:first-child { color: #555; }
        .profile-stat span:last-child { font-weight: 700; color: #0A66C2; }
        .profile-premium {
          display: flex; align-items: center; gap: 6px; margin-top: 10px;
          padding: 8px 10px; background: #FEF9EC; border-radius: 8px;
          font-size: 12px; color: #8A6800; font-weight: 600; cursor: pointer;
        }

        .shortcut-card { background: #fff; border: 1px solid #E4E4E7; border-radius: 10px; padding: 8px 0; }
        .shortcut-item {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 14px; font-size: 13px; color: #444;
          cursor: pointer; border: none; background: none;
          width: 100%; text-align: left; font-family: inherit; transition: background 0.1s;
        }
        .shortcut-item:hover { background: #F2F2F7; color: #0A66C2; }

        /* Feed */
        .feed { display: flex; flex-direction: column; gap: 10px; }

        .composer { background: #fff; border: 1px solid #E4E4E7; border-radius: 10px; padding: 14px 16px; }
        .composer-top { display: flex; align-items: center; gap: 10px; }
        .composer-ava {
          width: 44px; height: 44px; border-radius: 50%;
          background: #0A66C2; display: flex; align-items: center; justify-content: center;
          font-size: 16px; font-weight: 700; color: #fff; flex-shrink: 0;
        }
        .composer-input {
          flex: 1; height: 44px; border: 1.5px solid #C9CDD2; border-radius: 22px;
          padding: 0 16px; font-family: inherit; font-size: 14px; color: #666;
          cursor: pointer; background: none; outline: none;
          transition: border-color 0.15s;
        }
        .composer-input:hover, .composer-input:focus { border-color: #0A66C2; }
        .composer-actions { display: flex; margin-top: 8px; padding-top: 8px; border-top: 1px solid #E4E4E7; }
        .composer-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 14px; border-radius: 8px;
          font-size: 13px; font-weight: 600; color: #444;
          cursor: pointer; border: none; background: none; font-family: inherit; transition: background 0.1s;
        }
        .composer-btn:hover { background: #F2F2F7; }

        .post-card { background: #fff; border: 1px solid #E4E4E7; border-radius: 10px; overflow: hidden; }
        .post-header { display: flex; align-items: flex-start; gap: 10px; padding: 14px 16px 0; }
        .post-ava {
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; font-weight: 700; color: #fff; flex-shrink: 0;
        }
        .post-meta { flex: 1; }
        .post-author { font-size: 14px; font-weight: 700; }
        .post-role { font-size: 12px; color: #555; margin-top: 1px; }
        .post-time { font-size: 11.5px; color: #999; margin-top: 1px; }
        .post-menu {
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; border: none; background: none;
          font-size: 18px; color: #666; transition: background 0.1s;
        }
        .post-menu:hover { background: #F2F2F7; }
        .post-content { padding: 12px 16px; font-size: 14px; line-height: 1.65; white-space: pre-line; }
        .post-job-badge {
          margin: 0 16px 12px; background: #EEF3F8; border-radius: 8px;
          padding: 10px 14px; display: flex; align-items: center; gap: 8px;
          font-size: 13px; color: #0A66C2; font-weight: 600;
        }
        .post-stats {
          padding: 4px 16px 8px;
          display: flex; justify-content: space-between;
          font-size: 12px; color: #666;
        }
        .post-actions { border-top: 1px solid #E4E4E7; display: flex; }
        .post-action {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px 0; font-size: 13.5px; font-weight: 600; color: #666;
          cursor: pointer; border: none; background: none; font-family: inherit;
          transition: background 0.1s;
        }
        .post-action:hover { background: #F2F2F7; color: #0A66C2; }
        .post-action.liked { color: #0A66C2; }

        /* Right */
        .right-col { display: flex; flex-direction: column; gap: 10px; }
        .widget-card { background: #fff; border: 1px solid #E4E4E7; border-radius: 10px; overflow: hidden; }
        .widget-title { font-size: 15px; font-weight: 700; padding: 14px 16px 10px; }

        .job-item {
          display: flex; align-items: center; gap: 12px; padding: 10px 16px;
          border-top: 1px solid #E4E4E7; cursor: pointer; transition: background 0.1s;
        }
        .job-item:hover { background: #F8F8FC; }
        .job-logo {
          width: 40px; height: 40px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; font-weight: 800; color: #fff; flex-shrink: 0;
        }
        .job-info { flex: 1; }
        .job-title { font-size: 13.5px; font-weight: 600; }
        .job-company { font-size: 12px; color: #666; }
        .job-salary { font-size: 11.5px; color: #0A66C2; font-weight: 600; margin-top: 2px; }
        .apply-btn {
          font-size: 12.5px; font-weight: 700; padding: 5px 14px;
          border-radius: 16px; border: 1.5px solid #0A66C2; color: #0A66C2;
          background: none; cursor: pointer; font-family: inherit; transition: all 0.15s; flex-shrink: 0;
        }
        .apply-btn:hover { background: #0A66C2; color: #fff; }

        .person-item { display: flex; align-items: center; gap: 10px; padding: 10px 16px; border-top: 1px solid #E4E4E7; }
        .person-ava {
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; font-weight: 700; color: #fff; flex-shrink: 0;
        }
        .person-info { flex: 1; }
        .person-name { font-size: 13.5px; font-weight: 600; }
        .person-role { font-size: 12px; color: #666; }
        .person-mutual { font-size: 11.5px; color: #999; }
        .connect-btn {
          font-size: 12.5px; font-weight: 700; padding: 5px 14px;
          border-radius: 16px; border: 1.5px solid #0A66C2; color: #0A66C2;
          background: none; cursor: pointer; font-family: inherit; transition: all 0.15s; flex-shrink: 0;
        }
        .connect-btn:hover { background: #0A66C2; color: #fff; }
        .connect-btn.done { border-color: #C9CDD2; color: #666; background: #F2F2F7; }

        .widget-footer {
          display: flex; align-items: center; justify-content: center;
          padding: 10px; border-top: 1px solid #E4E4E7;
          font-size: 13px; font-weight: 600; color: #0A66C2; cursor: pointer;
        }
        .widget-footer:hover { background: #F2F2F7; }

        .trend-item { padding: 8px 16px; border-top: 1px solid #E4E4E7; cursor: pointer; transition: background 0.1s; }
        .trend-item:hover { background: #F8F8FC; }
        .trend-tag { font-size: 13.5px; font-weight: 600; color: #0A66C2; }
        .trend-count { font-size: 11.5px; color: #999; margin-top: 1px; }

        .footer-links { font-size: 11px; color: #999; line-height: 1.9; padding: 4px 0; }

        @media (max-width: 1024px) {
          .jub-body { grid-template-columns: 200px 1fr; }
          .right-col { display: none; }
        }
        @media (max-width: 768px) {
          .jub-body { grid-template-columns: 1fr; }
          .left-col { display: none; }
          .nav-search { display: none; }
        }
      `}</style>

      <div className="jub">
        {/* Navbar */}
        <nav className="jub-nav">
          <div className="nav-inner">
            <span className="nav-logo">jub.</span>
            <div className="nav-search">
              <span>🔍</span>
              <input placeholder="Tìm kiếm..." />
            </div>
            <div className="nav-links">
              {navLinks.map((nl, i) => (
                <button
                  key={i}
                  className={`nav-link${activeNav === i ? " active" : ""}`}
                  onClick={() => setActiveNav(i)}
                >
                  <span className="nl-icon">{nl.icon}</span>
                  <span>{nl.label}</span>
                </button>
              ))}
              <div className="nav-avatar">
                {initials(user?.fullName || "U")}
              </div>
              <button className="nav-logout" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          </div>
        </nav>

        {/* Body */}
        <div className="jub-body">
          {/* Left */}
          <div className="left-col">
            <div className="profile-card">
              <div className="profile-cover" />
              <div className="profile-body">
                <div className="profile-ava">
                  {initials(user?.fullName || "U")}
                </div>
                <div className="profile-name">
                  {user?.fullName || "Người dùng"}
                </div>
                <div className="profile-role">
                  Tìm việc tích cực · IT & Tech
                </div>
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
                <div className="profile-premium">
                  ⭐ Thử Jub Premium miễn phí
                </div>
              </div>
            </div>

            <div className="shortcut-card">
              {[
                { icon: "📌", label: "Việc làm đã lưu" },
                { icon: "📋", label: "Việc đã ứng tuyển" },
                { icon: "👥", label: "Nhóm của tôi" },
                { icon: "📰", label: "Bản tin theo dõi" },
                { icon: "🎓", label: "Khoá học & Chứng chỉ" },
              ].map((s, i) => (
                <button className="shortcut-item" key={i}>
                  <span>{s.icon}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Feed */}
          <div className="feed">
            {/* Composer */}
            <div className="composer">
              <div className="composer-top">
                <div className="composer-ava">
                  {initials(user?.fullName || "U")}
                </div>
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

            {/* Posts */}
            {posts.map((post) => (
              <div className="post-card" key={post.id}>
                <div className="post-header">
                  <div
                    className="post-ava"
                    style={{ background: post.avatarColor }}
                  >
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
                  <div className="post-job-badge">
                    💼 Bài đăng tuyển dụng · Ứng tuyển ngay
                  </div>
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
                    onClick={() => toggleLike(post.id)}
                  >
                    👍 Thích
                  </button>
                  <button className="post-action">💬 Bình luận</button>
                  <button className="post-action">↗️ Chia sẻ</button>
                  <button className="post-action">📤 Gửi</button>
                </div>
              </div>
            ))}
          </div>

          {/* Right */}
          <div className="right-col">
            {/* Jobs */}
            <div className="widget-card">
              <div className="widget-title">Việc làm gợi ý</div>
              {jobSuggestions.map((job, i) => (
                <div className="job-item" key={i}>
                  <div className="job-logo" style={{ background: job.color }}>
                    {job.logo}
                  </div>
                  <div className="job-info">
                    <div className="job-title">{job.title}</div>
                    <div className="job-company">{job.company}</div>
                    <div className="job-salary">{job.salary}/tháng</div>
                  </div>
                  <button className="apply-btn">Nộp CV</button>
                </div>
              ))}
              <div className="widget-footer">Xem thêm →</div>
            </div>

            {/* People */}
            <div className="widget-card">
              <div className="widget-title">Người bạn có thể biết</div>
              {suggestedConnections.map((person, i) => (
                <div className="person-item" key={i}>
                  <div
                    className="person-ava"
                    style={{ background: person.color }}
                  >
                    {person.avatar}
                  </div>
                  <div className="person-info">
                    <div className="person-name">{person.name}</div>
                    <div className="person-role">{person.role}</div>
                    <div className="person-mutual">
                      {person.mutual} kết nối chung
                    </div>
                  </div>
                  <button
                    className={`connect-btn${connected.includes(i) ? " done" : ""}`}
                    onClick={() =>
                      setConnected((prev) =>
                        prev.includes(i)
                          ? prev.filter((x) => x !== i)
                          : [...prev, i],
                      )
                    }
                  >
                    {connected.includes(i) ? "✓ Đã kết nối" : "+ Kết nối"}
                  </button>
                </div>
              ))}
              <div className="widget-footer">Xem tất cả →</div>
            </div>

            {/* Trending */}
            <div className="widget-card">
              <div className="widget-title">Xu hướng hôm nay</div>
              {[
                { tag: "#ReactJS", count: "2.4k bài đăng" },
                { tag: "#TuyenDung2026", count: "1.8k bài đăng" },
                { tag: "#NextJS15", count: "1.1k bài đăng" },
                { tag: "#AIEngineer", count: "980 bài đăng" },
                { tag: "#RemoteWork", count: "754 bài đăng" },
              ].map((t, i) => (
                <div className="trend-item" key={i}>
                  <div className="trend-tag">{t.tag}</div>
                  <div className="trend-count">{t.count}</div>
                </div>
              ))}
            </div>

            <div className="footer-links">
              Giới thiệu · Điều khoản · Chính sách · Cookie
              <br />© 2026 Jub Vietnam
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
