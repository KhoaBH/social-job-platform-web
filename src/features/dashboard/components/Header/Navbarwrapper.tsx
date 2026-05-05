"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

const initials = (name: string) =>
  name
    ? name
        .split(" ")
        .map((w) => w[0])
        .slice(-2)
        .join("")
    : "U";

export default function NavbarWrapper() {
  const [activeNav, setActiveNav] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/jobs") {
      setActiveNav(1);
    } else {
      setActiveNav(0);
    }
  }, [pathname]);

  return (
    <Navbar
      activeNav={activeNav}
      setActiveNav={setActiveNav}
      initials={initials}
    />
  );
}
