"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

const initials = (name: string) =>
  name ? name.split(" ").map((w) => w[0]).slice(-2).join("") : "U";

export default function NavbarWrapper() {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <Navbar
      activeNav={activeNav}
      setActiveNav={setActiveNav}
      initials={initials}
    />
  );
}