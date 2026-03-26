"use client";
import React, { useState } from "react";
import { Facebook } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useLoginWithFirebaseMutation } from "@/features/auth/authApi";
import { useRouter } from "next/navigation";
import { setCredentials } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const [loginWithFirebase, { isLoading }] = useLoginWithFirebaseMutation();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      // Sign in with Google through Firebase
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const response = await loginWithFirebase({
        idToken,
      }).unwrap();
      dispatch(setCredentials(response));
      router.push("/dashboard");
      console.log("Login successful:", response);
    } catch (error) {
      console.error("Google login failed:", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-sm">
      {/* Nút đăng nhập Google */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading || isLoading}
        className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-3.5 rounded-2xl hover:bg-slate-50 hover:shadow-md transition-all font-semibold text-slate-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-5 h-5"
          alt="google"
        />
        {isGoogleLoading || isLoading ? "Đang xử lý..." : "Tiếp tục với Google"}
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
