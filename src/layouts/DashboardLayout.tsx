import { DashBoardNavbar } from "@/components/Navbar/DashBoardNavbar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="container mx-auto flex flex-col px-0 h-full">
      <DashBoardNavbar />
      {children}
    </main>
  );
};

export default DashboardLayout;
