// src/features/profile/constants/profileMockData.ts

export const mockProfileUser = {
  fullName: "Lâm Anh Khoa",
  username: "lamanhkhoa",
  avatar: "L",
  avatarColor: "#5B4FCF",
  coverGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
  headline: "Student at University of Information Technology",
  location: "Ho Chi Minh City, Vietnam",
  bio: "Sinh viên năm 3 UIT | Đam mê Frontend & UI/UX | Đang tìm kiếm cơ hội thực tập",
  website: "github.com/lamanhkhoa",
  connections: 127,
  followers: 340,
  profileViews: 48,
  postImpressions: 312,
  searchAppearances: 0,
  isOwner: true,
  openToWork: true,
  school: "University of Information Technology",
  schoolLogo: "UIT",
};

export const mockExperiences = [
  {
    id: 1,
    title: "Frontend Intern",
    company: "Teko Vietnam",
    companyLogo: "T",
    companyColor: "#FF6B35",
    type: "Thực tập",
    startDate: "06/2024",
    endDate: "09/2024",
    duration: "4 tháng",
    location: "TP. Hồ Chí Minh",
    description: "Phát triển UI components với React & TypeScript. Tham gia dự án e-commerce internal tool.",
    skills: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Web Developer",
    company: "UIT Student Club",
    companyLogo: "U",
    companyColor: "#0EA5E9",
    type: "Part-time",
    startDate: "09/2023",
    endDate: "Hiện tại",
    duration: "1 năm 6 tháng",
    location: "Từ xa",
    description: "Xây dựng và maintain website cho câu lạc bộ sinh viên UIT.",
    skills: ["Next.js", "Node.js"],
  },
];

export const mockEducation = [
  {
    id: 1,
    school: "University of Information Technology",
    schoolLogo: "UIT",
    schoolColor: "#1565C0",
    degree: "Cử nhân",
    major: "Hệ thống Thông tin Quản lý",
    startYear: "2022",
    endYear: "2026",
    gpa: "3.2 / 4.0",
    activities: "CLB Web UIT, Tình nguyện viên UIT Hackathon 2023",
  },
];

export const mockSkills = [
  { id: 1, name: "React.js", category: "Kỹ thuật", endorsements: 12, endorsed: false },
  { id: 2, name: "TypeScript", category: "Kỹ thuật", endorsements: 8, endorsed: true },
  { id: 3, name: "Next.js", category: "Kỹ thuật", endorsements: 6, endorsed: false },
  { id: 4, name: "Tailwind CSS", category: "Kỹ thuật", endorsements: 9, endorsed: false },
  { id: 5, name: "Figma", category: "Thiết kế", endorsements: 5, endorsed: false },
  { id: 6, name: "UI/UX Design", category: "Thiết kế", endorsements: 4, endorsed: false },
  { id: 7, name: "Giao tiếp", category: "Kỹ năng mềm", endorsements: 7, endorsed: false },
  { id: 8, name: "Làm việc nhóm", category: "Kỹ năng mềm", endorsements: 11, endorsed: false },
  { id: 9, name: "Giải quyết vấn đề", category: "Kỹ năng mềm", endorsements: 6, endorsed: false },
];

export const mockPosts = [
  {
    id: 1,
    content: "Vừa hoàn thành project cuối kỳ với Next.js 15! App load nhanh hơn 60% so với version cũ \n\nStack mình dùng: Next.js 15 + TypeScript + Prisma + PostgreSQL",
    time: "2 ngày trước",
    likes: 48,
    comments: 12,
    shares: 3,
    liked: false,
    image: null,
  },
  {
    id: 2,
    content: "Tips học React hiệu quả cho newbie:\n\n1. Hiểu JavaScript trước\n2. Học hooks từ useState rồi useEffect\n3. Thực hành nhiều hơn đọc doc\n4. Build project thực tế\n\nĐừng học theo tutorial hell 🙌",
    time: "1 tuần trước",
    likes: 134,
    comments: 27,
    shares: 18,
    liked: true,
    image: null,
  },
];

export const mockInterests = [
  { id: 1, name: "Teko Vietnam", logo: "T", color: "#FF6B35", followers: "15.2k", following: true },
  { id: 2, name: "VNG Corporation", logo: "V", color: "#0066FF", followers: "48.7k", following: true },
  { id: 3, name: "FPT Software", logo: "F", color: "#F97316", followers: "125k", following: false },
  { id: 4, name: "Shopee Vietnam", logo: "S", color: "#EE4D2D", followers: "203k", following: false },
];

export const mockConnections = [
  { id: 1, name: "Nguyễn Minh Tuấn", role: "Frontend Engineer tại Tiki", avatar: "T", color: "#FF6B35", mutual: 5 },
  { id: 2, name: "Trần Thị Lan Anh", role: "Product Manager tại MoMo", avatar: "L", color: "#8B5CF6", mutual: 3 },
  { id: 3, name: "Phạm Đức Anh", role: "Tech Lead tại FPT Software", avatar: "Đ", color: "#0EA5E9", mutual: 8 },
  { id: 4, name: "Lê Văn Hùng", role: "DevOps Engineer", avatar: "H", color: "#F59E0B", mutual: 2 },
  { id: 5, name: "Ngô Thanh Hà", role: "UX Designer", avatar: "H", color: "#EC4899", mutual: 6 },
  { id: 6, name: "Đinh Quốc Bảo", role: "Data Engineer", avatar: "B", color: "#10B981", mutual: 4 },
];