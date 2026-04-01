"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { navLinks } from "../../data/mockData";
import { ROUTES } from "@/constants/routes";
import { Search } from "lucide-react";

interface NavbarProps {
  activeNav: number;
  setActiveNav: (i: number) => void;
  initials: (name: string) => string;
}

export default function Navbar({
  activeNav,
  setActiveNav,
  initials,
}: NavbarProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleNavClick = (index: number) => {
    setActiveNav(index);
    if (index === 0) {
      router.push(ROUTES.PROTECTED.DASHBOARD);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push(ROUTES.PUBLIC.LOGIN);
  };

  return (
    <nav className="bg-white border-b border-[#E4E4E7] sticky top-0 z-100 h-14 flex items-center px-4">
      <div className="max-w-282 w-full mx-auto flex items-center gap-0">
        {/* Logo */}
        <button
          onClick={() => router.push(ROUTES.PROTECTED.DASHBOARD)}
          className="text-[22px] font-bold text-[#0A66C2] tracking-[-0.5px] mr-3 bg-transparent border-none cursor-pointer"
          aria-label="Go to dashboard"
        >
          jub.
        </button>

        {/* Search */}
        <div className="flex items-center gap-2 bg-[#EEF3F8] rounded-md px-3 h-8.5 w-55 shrink-0">
          <Search size={16} />
          <input
            className="bg-transparent border-none outline-none font-[inherit] text-[13.5px]
                       text-[#1A1A1A] w-full placeholder:text-[#888]"
            placeholder="Tìm kiếm..."
          />
        </div>

        {/* Nav links */}
        <div className="flex items-center ml-auto gap-1">
          {navLinks.map((nl, i) => (
            <button
              key={i}
              onClick={() => handleNavClick(i)}
              className={`flex flex-col items-center gap-0.5 px-4 h-14 justify-center
                          text-[11.5px] cursor-pointer border-none border-b-2 bg-transparent
                          font-[inherit] font-medium transition-all duration-150
                          ${
                            activeNav === i
                              ? "text-[#111827] border-[#111827]"
                              : "text-[#4B5563] border-transparent hover:text-[#111827]"
                          }`}
            >
              <span className="text-xl leading-none">{nl.icon}</span>
              <span>{nl.label}</span>
            </button>
          ))}

          {/* Avatar → profile link */}
          <Link
            href={user?.id ? ROUTES.PROTECTED.PROFILE.VIEW(user.id) : "#"}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white bg-[#0A66C2]
                       cursor-pointer shrink-0 ml-2 no-underline"
          >
            {initials(user?.fullName || "U")}
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="ml-2 px-3.5 py-1.5 text-[12.5px] font-semibold text-[#666]
                       border-[1.5px] border-[#C9CDD2] rounded-2xl bg-transparent
                       cursor-pointer font-[inherit] transition-all duration-150
                       hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </nav>
  );
}
