"use client";
import React from "react";
import { Facebook } from "lucide-react";

export default function LoginForm() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      {/* Nút đăng nhập Google */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-3.5 rounded-2xl hover:bg-slate-50 hover:shadow-md transition-all font-semibold text-slate-700 active:scale-[0.98]"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-5 h-5"
          alt="google"
        />
        Tiếp tục với Google
      </button>

      {/* Nút đăng nhập Facebook */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white py-3.5 rounded-2xl hover:bg-[#166fe5] hover:shadow-lg hover:shadow-blue-200 transition-all font-semibold active:scale-[0.98]"
      >
        <Facebook size={20} fill="white" />
        Tiếp tục với Facebook
      </button>

      <div className="pt-4">
        <p className="text-[11px] text-center text-slate-400 leading-relaxed">
          Bằng cách đăng nhập, bạn đồng ý với <br />
          <a href="#" className="text-slate-600 font-bold hover:underline">
            Điều khoản dịch vụ
          </a>{" "}
          &{" "}
          <a href="#" className="text-slate-600 font-bold hover:underline">
            Chính sách bảo mật
          </a>
        </p>
      </div>
    </div>
  );
}
