
import NavbarWrapper from "@/features/dashboard/components/Header/Navbarwrapper";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <NavbarWrapper />
      {children}
    </div>
  );
}