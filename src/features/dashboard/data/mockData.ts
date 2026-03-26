export const mockPosts = [
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

export const suggestedConnections = [
  { name: "Lê Văn Hùng", role: "DevOps Engineer · AWS", avatar: "H", color: "#F59E0B", mutual: 12 },
  { name: "Ngô Thanh Hà", role: "UX Designer · Figma", avatar: "H", color: "#EC4899", mutual: 8 },
  { name: "Đinh Quốc Bảo", role: "Data Engineer · Spark", avatar: "B", color: "#10B981", mutual: 5 },
];

export const jobSuggestions = [
  { title: "Frontend Developer", company: "Shopee", salary: "30–50tr", logo: "S", color: "#EE4D2D" },
  { title: "React Native Dev", company: "VNG", salary: "35–55tr", logo: "V", color: "#0066FF" },
  { title: "UI/UX Designer", company: "Zalo", salary: "25–40tr", logo: "Z", color: "#0068FF" },
];

export const navLinks = [
  { label: "Trang chủ", icon: "🏠" },
  { label: "Việc làm", icon: "💼" },
  { label: "Mạng lưới", icon: "👥" },
  { label: "Tin nhắn", icon: "💬" },
  { label: "Thông báo", icon: "🔔" },
];

export const trendingTopics = [
  { tag: "#ReactJS", count: "2.4k bài đăng" },
  { tag: "#TuyenDung2026", count: "1.8k bài đăng" },
  { tag: "#NextJS15", count: "1.1k bài đăng" },
  { tag: "#AIEngineer", count: "980 bài đăng" },
  { tag: "#RemoteWork", count: "754 bài đăng" },
];