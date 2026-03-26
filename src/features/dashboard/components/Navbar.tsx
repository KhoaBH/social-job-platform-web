"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { navLinks } from "../data/mockData";

interface NavbarProps {
  activeNav: number;
  setActiveNav: (i: number) => void;
  initials: (name: string) => string;
}

export default function Navbar({ activeNav, setActiveNav, initials }: NavbarProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
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
          <div className="nav-avatar">{initials(user?.fullName || "U")}</div>
          <button className="nav-logout" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </div>
    </nav>
  );
}