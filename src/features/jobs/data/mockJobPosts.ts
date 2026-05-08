export type ExperienceLevel = "INTERN" | "JUNIOR" | "MID" | "SENIOR" | "LEAD";
export type JobPostStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export interface MockCompany {
  id: string;
  name: string;
  logo: string;
  color: string;
  employeeCount: number;
  foundedYear: number;
  description: string;
}

export interface MockUser {
  id: string;
  fullName: string;
  avatarUrl?: string | null;
}

export interface MockJobPost {
  id: string;
  company: MockCompany;
  postedBy: MockUser;
  title: string;
  description: string;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  location: string;
  status: JobPostStatus;
  postedAt: string;
  applications: number;
  benefits: string[];
}

export const mockJobPosts: MockJobPost[] = [
  {
    id: "job-0",
    company: {
      id: "company-shopee",
      name: "Shopee Vietnam",
      logo: "S",
      color: "#EE4D2D",
      employeeCount: 5000,
      foundedYear: 2015,
      description:
        "Shopee là platform e-commerce lớn nhất Đông Nam Á, tập trung vào trải nghiệm mua sắm và công nghệ quy mô lớn.",
    },
    postedBy: {
      id: "user-tuan",
      fullName: "Nguyễn Minh Tuấn",
    },
    title: "Frontend Developer",
    description:
      "━━━ GIỚI THIỆU ━━━\nChúng tôi đang tìm một Frontend Developer giàu kinh nghiệm để join vào team Shopee Vietnam.\nBạn sẽ làm việc trên các dự án quy mô lớn, phục vụ hàng triệu người dùng hàng ngày.\n\n━━━ YÊU CẦU ━━━\n• Kinh nghiệm 3+ năm với React/Next.js\n• Hiểu sâu về performance optimization\n• Làm việc tốt trong team\n• Có portfolio hoặc open source projects\n\n━━━ ĐƯỢC CẤP ━━━\n• Lương competitive (30-50tr/tháng)\n• Thưởng hiệu suất\n• Du lịch team đi Úc/Nhật Bản\n• MacBook Pro mới nhất",
    experienceLevel: "SENIOR",
    salaryMin: 30000000,
    salaryMax: 50000000,
    location: "TP.HCM",
    status: "ACTIVE",
    postedAt: "2 ngày trước",
    applications: 124,
    benefits: [
      "Lương cao",
      "Thưởng hiệu suất",
      "MacBook Pro",
      "Du lịch team",
      "Health insurance",
      "Gym membership",
    ],
  },
  {
    id: "job-1",
    company: {
      id: "company-vng",
      name: "VNG Corporation",
      logo: "V",
      color: "#0066FF",
      employeeCount: 3000,
      foundedYear: 2008,
      description:
        "VNG là tập đoàn công nghệ hàng đầu Việt Nam với các sản phẩm nổi tiếng như Zalo, Zingplay, ZingMP3.",
    },
    postedBy: {
      id: "user-lananh",
      fullName: "Trần Thị Lan Anh",
    },
    title: "React Native Dev",
    description:
      "━━━ GIỚI THIỆU ━━━\nVNG Corporation tuyển dụng React Native Developer cho dự án mobile app quy mô lớn.\nTìm kiếm những lập trình viên giàu kinh nghiệm và đam mê công nghệ mobile.\n\n━━━ YÊU CẦU ━━━\n• 2+ năm kinh nghiệm React Native\n• Hiểu JavaScript/TypeScript sâu sắc\n• Optimization cho performance mobile\n\n━━━ QUYỀN LỢI ━━━\n• Lương 35-55tr\n• Bonus thưởng tết đạo tạo\n• Máy tính xách tay cao cấp\n• Phép phép rộng",
    experienceLevel: "MID",
    salaryMin: 35000000,
    salaryMax: 55000000,
    location: "TP.HCM",
    status: "ACTIVE",
    postedAt: "3 ngày trước",
    applications: 89,
    benefits: [
      "Lương 35-55tr",
      "Laptop cao cấp",
      "Phép rộng",
      "Đào tạo kỹ năng",
      "Cơm trưa",
      "Gym",
    ],
  },
  {
    id: "job-2",
    company: {
      id: "company-zalo",
      name: "Zalo (VNG)",
      logo: "Z",
      color: "#0068FF",
      employeeCount: 1000,
      foundedYear: 2012,
      description:
        "Zalo là platform messaging lớn nhất Việt Nam với 170+ triệu users và hệ sinh thái sản phẩm đang phát triển nhanh.",
    },
    postedBy: {
      id: "user-minhchau",
      fullName: "Lê Minh Châu",
    },
    title: "UI/UX Designer",
    description:
      "━━━ GIỚI THIỆU ━━━\nZalo tuyển dụng UI/UX Designer cho dự án redesign app.\nBạn sẽ tham gia vào quá trình thiết kế giao diện cho hàng triệu user.\n\n━━━ YÊU CẦU ━━━\n• 2+ năm kinh nghiệm design\n• Thành thạo Figma, Adobe XD\n• Hiểu UX research\n\n━━━ QUYỀN LỢI ━━━\n• Lương 25-40tr\n• Setup workspace tốt\n• Học tập liên tục",
    experienceLevel: "MID",
    salaryMin: 25000000,
    salaryMax: 40000000,
    location: "Hà Nội",
    status: "ACTIVE",
    postedAt: "4 ngày trước",
    applications: 56,
    benefits: [
      "Lương 25-40tr",
      "Figma license",
      "Design tools",
      "Workspace tốt",
      "Coffee",
      "Team outing",
    ],
  },
  {
    id: "job-3",
    company: {
      id: "company-tiki",
      name: "Tiki Corporation",
      logo: "T",
      color: "#FF6B35",
      employeeCount: 2500,
      foundedYear: 2014,
      description:
        "Tiki là platform thương mại điện tử hàng đầu Việt Nam, xử lý hàng triệu đơn hàng mỗi ngày.",
    },
    postedBy: {
      id: "user-quan",
      fullName: "Phạm Quốc Quân",
    },
    title: "Backend Developer",
    description:
      "━━━ GIỚI THIỆU ━━━\nTiki tuyển dụng Backend Developer cho team Infrastructure.\nBạn sẽ xây dựng hệ thống backend phục vụ hàng triệu transaction mỗi ngày.\n\n━━━ YÊU CẦU ━━━\n• 3+ năm kinh nghiệm backend\n• Hiểu Node.js/Go/Java\n• Database optimization\n• Distributed systems",
    experienceLevel: "SENIOR",
    salaryMin: 35000000,
    salaryMax: 60000000,
    location: "TP.HCM",
    status: "ACTIVE",
    postedAt: "1 ngày trước",
    applications: 98,
    benefits: [
      "Lương 35-60tr",
      "Laptop MacBook",
      "Learning budget",
      "Health insurance",
      "Gym",
      "Stock options",
    ],
  },
  {
    id: "job-4",
    company: {
      id: "company-fpt-software",
      name: "FPT Software",
      logo: "F",
      color: "#1BA5E0",
      employeeCount: 18000,
      foundedYear: 1999,
      description:
        "FPT Software là công ty CNTT hàng đầu Việt Nam, cung cấp giải pháp công nghệ cho các khách hàng toàn cầu.",
    },
    postedBy: {
      id: "user-thanhmai",
      fullName: "Ngô Thanh Mai",
    },
    title: "DevOps Engineer",
    description:
      "━━━ GIỚI THIỆU ━━━\nFPT Software tuyển dụng DevOps Engineer cho dự án cloud infrastructure.\n\n━━━ YÊU CẦU ━━━\n• 3+ năm kinh nghiệm DevOps\n• Kubernetes, Docker\n• AWS/Azure/GCP\n• CI/CD pipelines",
    experienceLevel: "SENIOR",
    salaryMin: 40000000,
    salaryMax: 70000000,
    location: "Hà Nội",
    status: "ACTIVE",
    postedAt: "5 ngày trước",
    applications: 67,
    benefits: [
      "Lương 40-70tr",
      "Cloud training",
      "Laptop MacBook Pro",
      "Visa support",
      "Relocation",
      "Stock options",
    ],
  },
  {
    id: "job-5",
    company: {
      id: "company-momo",
      name: "MoMo Vietnam",
      logo: "M",
      color: "#A400D6",
      employeeCount: 800,
      foundedYear: 2014,
      description:
        "MoMo là fintech unicorn Việt Nam, đang xây dựng hệ sinh thái thanh toán và tài chính số quy mô lớn.",
    },
    postedBy: {
      id: "user-hieupham",
      fullName: "Đinh Hữu Phạm",
    },
    title: "Full Stack Developer",
    description:
      "━━━ GIỚI THIỆU ━━━\nMoMo tuyển dụng Full Stack Developer cho team Platform.\n\n━━━ YÊU CẦU ━━━\n• 3+ năm full stack development\n• React + Node.js/Django/Spring\n• Microservices architecture\n• Payment systems",
    experienceLevel: "SENIOR",
    salaryMin: 45000000,
    salaryMax: 80000000,
    location: "TP.HCM",
    status: "ACTIVE",
    postedAt: "6 ngày trước",
    applications: 145,
    benefits: [
      "Lương 45-80tr",
      "Laptop MacBook",
      "Stock options",
      "Healthcare",
      "Gym",
      "Relocation",
    ],
  },
];

export const mockJobPostById = Object.fromEntries(
  mockJobPosts.map((job) => [job.id, job])
) as Record<string, MockJobPost>;
