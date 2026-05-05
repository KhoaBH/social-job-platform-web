"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Calendar,
  Building2,
  Users,
  Check,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// Mock jobs data
const mockJobs: Record<string, any> = {
  "job-0": {
    id: "job-0",
    title: "Frontend Developer",
    company: "Shopee",
    company_name: "Shopee Vietnam",
    company_employees: 5000,
    company_founded: 2015,
    salary: "30–50tr",
    logo: "S",
    color: "#EE4D2D",
    location: "TP.HCM",
    type: "Full-time",
    level: "Senior",
    description: `
      Chúng tôi đang tìm một Frontend Developer giàu kinh nghiệm để join vào team Shopee Vietnam.
      
      Bạn sẽ làm việc trên các dự án quy mô lớn, phục vụ hàng triệu người dùng hàng ngày.
      
      Yêu cầu:
      - Kinh nghiệm 3+ năm với React/Next.js
      - Hiểu sâu về performance optimization
      - Làm việc tốt trong team
      - Có portfolio hoặc open source projects
      
      Được cấp:
      - Lương competitive (30-50tr/tháng)
      - Thưởng hiệu suất
      - Du lịch team đi Úc/Nhật Bản
      - MacBook Pro mới nhất
    `,
    company_info:
      "Shopee là platform e-commerce lớn nhất Đông Nam Á, với mục sứ phục vụ hàng triệu người dùng hàng ngày. Chúng tôi là công ty công nghệ hàng đầu, tập trung vào việc cung cấp trải nghiệm mua sắm tốt nhất.",
    benefits: [
      "Lương cao",
      "Thưởng hiệu suất",
      "MacBook Pro",
      "Du lịch team",
      "Health insurance",
      "Gym membership",
    ],
    posted_at: "2 ngày trước",
    applications: 124,
  },
  "job-1": {
    id: "job-1",
    title: "React Native Dev",
    company: "VNG",
    company_name: "VNG Corporation",
    company_employees: 3000,
    company_founded: 2008,
    salary: "35–55tr",
    logo: "V",
    color: "#0066FF",
    location: "TP.HCM",
    type: "Full-time",
    level: "Mid-Senior",
    description: `
      VNG Corporation tuyên dụng React Native Developer cho dự án mobile app quy mô lớn.
      
      Tìm kiếm những lập trình viên giàu kinh nghiệm và đam mê công nghệ mobile.
      
      Yêu cầu:
      - 2+ năm kinh nghiệm React Native
      - Hiểu JavaScript/TypeScript sâu sắc
      - Optimization cho performance mobile
      
      Quyền lợi:
      - Lương 35-55tr
      - Bonus thưởng tết đạo tạo
      - Máy tính xách tay cao cấp
      - Phép phép rộng
    `,
    company_info:
      "VNG là tập đoàn công nghệ hàng đầu Việt Nam, sở hữu các sản phẩm nổi tiếng như Zalo, Zingplay, ZingMP3. Với hơn 3000 nhân viên, chúng tôi cam kết đổi mới trong lĩnh vực công nghệ.",
    benefits: [
      "Lương 35-55tr",
      "Laptop cao cấp",
      "Phép rộng",
      "Đào tạo kỹ năng",
      "Cơm trưa",
      "Gym",
    ],
    posted_at: "3 ngày trước",
    applications: 89,
  },
  "job-2": {
    id: "job-2",
    title: "UI/UX Designer",
    company: "Zalo",
    company_name: "Zalo (VNG)",
    company_employees: 1000,
    company_founded: 2012,
    salary: "25–40tr",
    logo: "Z",
    color: "#0068FF",
    location: "Hà Nội",
    type: "Full-time",
    level: "Mid",
    description: `
      Zalo tuyên dụng UI/UX Designer cho dự án redesign app.
      
      Bạn sẽ tham gia vào quá trình thiết kế giao diện cho hàng triệu user.
      
      Yêu cầu:
      - 2+ năm kinh nghiệm design
      - Thành thạo Figma, Adobe XD
      - Hiểu UX research
      
      Quyền lợi:
      - Lương 25-40tr
      - Setup workspace tốt
      - Học tập liên tục
    `,
    company_info:
      "Zalo là platform messaging lớn nhất Việt Nam với 170+ triệu users. Là sản phẩm của VNG, Zalo đang ngày càng phát triển và cung cấp các tính năng mới.",
    benefits: [
      "Lương 25-40tr",
      "Figma license",
      "Design tools",
      "Workspace tốt",
      "Coffee",
      "Team outing",
    ],
    posted_at: "4 ngày trước",
    applications: 56,
  },
  "job-3": {
    id: "job-3",
    title: "Backend Developer",
    company: "Tiki",
    salary: "35–60tr",
    logo: "T",
    color: "#FF6B35",
    location: "TP.HCM",
    type: "Full-time",
    level: "Senior",
    description: `
      Tiki tuyên dụng Backend Developer cho team Infrastructure.
      
      Bạn sẽ xây dựng hệ thống backend phục vụ hàng triệu transaction mỗi ngày.
      
      Yêu cầu:
      - 3+ năm kinh nghiệm backend
      - Hiểu Node.js/Go/Java
      - Database optimization
      - Distributed systems
    `,
    benefits: [
      "Lương 35-60tr",
      "Laptop MacBook",
      "Learning budget",
      "Health insurance",
      "Gym",
      "Stock options",
    ],
    company_info: "Tiki là platform thương mại điện tử hàng đầu Việt Nam.",
    posted_at: "1 ngày trước",
    applications: 98,
  },
  "job-4": {
    id: "job-4",
    title: "DevOps Engineer",
    company: "FPT Software",
    company_name: "FPT Software",
    company_employees: 18000,
    company_founded: 1999,
    salary: "40–70tr",
    logo: "F",
    color: "#1BA5E0",
    location: "Hà Nội",
    type: "Full-time",
    level: "Senior",
    description: `
      FPT Software tuyên dụng DevOps Engineer cho dự án cloud infrastructure.
      
      Yêu cầu:
      - 3+ năm kinh nghiệm DevOps
      - Kubernetes, Docker
      - AWS/Azure/GCP
      - CI/CD pipelines
    `,
    company_info:
      "FPT Software là công ty CNTT hàng đầu Việt Nam với hơn 18,000 nhân viên. Chúng tôi cung cấp các giải pháp công nghệ cho các công ty hàng đầu trên thế giới.",
    benefits: [
      "Lương 40-70tr",
      "Cloud training",
      "Laptop MacBook Pro",
      "Visa support",
      "Relocation",
      "Stock options",
    ],
    posted_at: "5 ngày trước",
    applications: 67,
  },
  "job-5": {
    id: "job-5",
    title: "Full Stack Developer",
    company: "MoMo",
    company_name: "MoMo Vietnam",
    company_employees: 800,
    company_founded: 2014,
    salary: "45–80tr",
    logo: "M",
    color: "#A400D6",
    location: "TP.HCM",
    type: "Full-time",
    level: "Senior",
    description: `
      MoMo tuyên dụng Full Stack Developer cho team Platform.
      
      Yêu cầu:
      - 3+ năm full stack development
      - React + Node.js/Django/Spring
      - Microservices architecture
      - Payment systems
    `,
    company_info:
      "MoMo là fintech startup unicorn Việt Nam, đạt định giá 5 tỷ USD. Chúng tôi đang xây dựng future of payments tại Việt Nam và Đông Nam Á.",
    benefits: [
      "Lương 45-80tr",
      "Laptop MacBook",
      "Stock options",
      "Healthcare",
      "Gym",
      "Relocation",
    ],
    posted_at: "6 ngày trước",
    applications: 145,
  },
};

const initials = (name: string) =>
  name
    ? name
        .split(" ")
        .map((w) => w[0])
        .slice(-2)
        .join("")
    : "U";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isApplied, setIsApplied] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  const jobId = params.id as string;
  const job = mockJobs[jobId];

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7]">
        <div className="text-center">
          <p className="text-[16px] font-semibold text-[#666] mb-4">
            Công việc không tìm thấy
          </p>
          <Link
            href="/jobs"
            className="text-[#0A66C2] font-semibold hover:underline"
          >
            ← Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    setIsApplied(true);
    // TODO: Call API to apply job
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] py-6">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#0A66C2] font-semibold mb-4 hover:underline"
          >
            <ArrowLeft size={18} />
            Quay lại
          </button>

          <div className="bg-white rounded-[10px] p-6 border border-[#E4E4E7]">
            <div className="flex items-start justify-between gap-4">
              {/* Job Info */}
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold text-white shrink-0"
                    style={{ background: job.color }}
                  >
                    {job.logo}
                  </div>

                  <div className="flex-1">
                    <h1 className="text-[28px] font-bold text-[#111827] leading-tight">
                      {job.title}
                    </h1>
                    <p className="text-[16px] text-[#666] mt-1">
                      {job.company}
                    </p>
                    <div className="flex items-center gap-3 mt-3 flex-wrap text-[13px]">
                      <span className="flex items-center gap-1 text-[#0A66C2] font-semibold">
                        <DollarSign size={14} />
                        {job.salary}/tháng
                      </span>
                      <span className="text-[#666]">•</span>
                      <span className="flex items-center gap-1 text-[#666]">
                        <MapPin size={14} />
                        {job.location}
                      </span>
                      <span className="text-[#666]">•</span>
                      <span className="text-[#666]">{job.type}</span>
                      <span className="text-[#666]">•</span>
                      <span className="text-[#999]">{job.posted_at}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={handleApply}
                disabled={isApplied}
                className={`px-6 py-3 rounded-full text-[14px] font-semibold shrink-0 transition-colors duration-150 ${
                  isApplied
                    ? "bg-[#E8F3E8] text-[#10B981] cursor-not-allowed flex items-center gap-2"
                    : "bg-[#0A66C2] text-white hover:bg-[#0958a8]"
                }`}
              >
                {isApplied && <Check size={16} />}
                {isApplied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#E4E4E7]">
              <div>
                <p className="text-[12px] text-[#999] font-semibold">Cấp độ</p>
                <p className="text-[13px] font-semibold text-[#111827] mt-1">
                  {job.level}
                </p>
              </div>
              <div>
                <p className="text-[12px] text-[#999] font-semibold">
                  Loại hình
                </p>
                <p className="text-[13px] font-semibold text-[#111827] mt-1">
                  {job.type}
                </p>
              </div>
              <div>
                <p className="text-[12px] text-[#999] font-semibold">
                  Địa điểm
                </p>
                <p className="text-[13px] font-semibold text-[#111827] mt-1">
                  {job.location}
                </p>
              </div>
              <div>
                <p className="text-[12px] text-[#999] font-semibold">
                  Lượt ứng tuyển
                </p>
                <p className="text-[13px] font-semibold text-[#111827] mt-1">
                  {job.applications}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-3 gap-6 max-[1024px]:grid-cols-1">
          {/* Main Content */}
          <div className="col-span-2">
            {/* Description */}
            <div className="bg-white rounded-[10px] p-6 border border-[#E4E4E7] mb-6">
              <h2 className="text-[18px] font-bold text-[#111827] mb-4">
                Mô tả công việc
              </h2>
              <div className="prose prose-sm max-w-none text-[14px] leading-[1.7] text-[#555] whitespace-pre-wrap">
                {job.description}
              </div>
            </div>

            {/* About Company */}
            <div className="bg-white rounded-[10px] p-6 border border-[#E4E4E7]">
              <h2 className="text-[18px] font-bold text-[#111827] mb-4">
                Thông tin thêm
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-[12px] text-[#999] font-semibold mb-1">
                    Cấp độ vị trí
                  </p>
                  <p className="text-[14px] text-[#111827]">{job.level}</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#999] font-semibold mb-1">
                    Loại hợp đồng
                  </p>
                  <p className="text-[14px] text-[#111827]">{job.type}</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#999] font-semibold mb-1">
                    Ngành nghề
                  </p>
                  <p className="text-[14px] text-[#111827]">Công nghệ / IT</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Company Info Card */}
            <div className="bg-white rounded-[10px] p-6 border border-[#E4E4E7] sticky top-24 mb-6">
              <div className="text-center mb-4">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 shrink-0"
                  style={{ background: job.color }}
                >
                  {job.logo}
                </div>
                <h3 className="text-[16px] font-bold text-[#111827]">
                  {job.company_name}
                </h3>
                <p className="text-[12px] text-[#999] mt-2">
                  {job.company_employees.toLocaleString()} nhân viên
                </p>
              </div>

              <p className="text-[13px] leading-[1.6] text-[#666] mb-4">
                {job.company_info}
              </p>

              <button
                onClick={() => setIsFollowed(!isFollowed)}
                className={`w-full px-4 py-2 rounded-full text-[13px] font-semibold transition-colors duration-150 ${
                  isFollowed
                    ? "bg-[#E8F3E8] text-[#10B981] border border-[#10B981]"
                    : "bg-[#F2F2F7] text-[#0A66C2] border border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white"
                }`}
              >
                {isFollowed ? "✓ Đã theo dõi" : "Theo dõi công ty"}
              </button>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-[10px] p-6 border border-[#E4E4E7] sticky top-64">
              <h3 className="text-[16px] font-bold text-[#111827] mb-4">
                Quyền lợi nhân viên
              </h3>
              <div className="space-y-3">
                {job.benefits.map((benefit: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F3E8] flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="text-[#10B981]" />
                    </div>
                    <span className="text-[13px] text-[#666]">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Apply Button */}
              <button
                onClick={handleApply}
                disabled={isApplied}
                className={`w-full mt-6 px-6 py-3 rounded-full text-[14px] font-semibold transition-colors duration-150 ${
                  isApplied
                    ? "bg-[#E8F3E8] text-[#10B981] cursor-not-allowed"
                    : "bg-[#0A66C2] text-white hover:bg-[#0958a8]"
                }`}
              >
                {isApplied ? "✓ Đã ứng tuyển" : "Ứng tuyển ngay"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
