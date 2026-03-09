import React from "react";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* CỘT TRÁI: Hình ảnh & Slogan (Ẩn trên mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 items-center justify-center p-12 overflow-hidden">
        {/* Hình ảnh nền - Khoa có thể thay URL ảnh khác tùy thích */}
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
          alt="Collaboration"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />

        {/* Overlay nội dung */}
        <div className="relative z-10 max-w-lg">
          <div className="mb-8 inline-block px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full backdrop-blur-md">
            <span className="text-blue-400 text-sm font-bold tracking-widest uppercase">
              Mạng xã hội việc làm mới
            </span>
          </div>
          <h2 className="text-5xl font-black text-white leading-[1.1] mb-6">
            Tìm kiếm công việc <br />
            <span className="text-blue-500">phù hợp nhất</span> <br />
            với cá tính của bạn.
          </h2>
          <p className="text-slate-300 text-lg">
            Gia nhập cộng đồng 10.000+ ứng viên trẻ đang kiến tạo sự nghiệp mỗi
            ngày tại Jub.
          </p>
        </div>

        {/* Decor: Logo Jub mờ ở góc */}
        <div className="absolute bottom-10 left-10 text-white/10 text-9xl font-black select-none">
          JUB
        </div>
      </div>

      {/* CỘT PHẢI: Form đăng nhập */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 bg-white">
        <div className="w-full max-w-[400px]">
          {/* Logo JUB */}
          <div className="mb-12 flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <span className="text-white font-black text-xl italic">J</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">
              Jub.
            </span>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 mb-3">
              Chào mừng!
            </h1>
            <p className="text-slate-500 font-medium">
              Bắt đầu hành trình sự nghiệp của bạn ngay hôm nay.
            </p>
          </div>

          <LoginForm />

          <div className="mt-20 text-center">
            <p className="text-slate-400 text-sm font-medium">
              Bạn là Nhà tuyển dụng?
              <a
                href="#"
                className="ml-2 text-blue-600 font-bold hover:underline"
              >
                Đăng tuyển ngay
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
