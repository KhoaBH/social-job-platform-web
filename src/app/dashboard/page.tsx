"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  // Lấy thông tin user từ "não" Redux ra hiển thị
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/login"); // Đăng xuất xong đuổi về trang login
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-8 border border-slate-100">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Chào mừng ông giáo, {user?.fullName || "Người dùng ẩn danh"}!
            </h1>
            <p className="text-slate-500">
              Đây là trang Dashboard tạm thời của khoa.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors"
          >
            Đăng xuất
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <h3 className="font-bold text-blue-700">Email</h3>
            <p className="text-blue-600">{user?.email}</p>
          </div>
          {/* Ông có thể thêm các card khác ở đây để test UI */}
        </div>
      </div>
    </div>
  );
}
