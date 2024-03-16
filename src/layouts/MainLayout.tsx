import { Navbar } from "@/components/Navbar/Navbar";
import Navigationbar from "@/components/Navbar/Navigationbar";
import Promobar from "@/components/Navbar/Promobar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto flex flex-col min-h-screen px-0">
      {/* promobar */}
      <Promobar message="This week - 20% flash sale" />
      {/* navbar */}
      <Navbar></Navbar>
      <Navigationbar></Navigationbar>
      <div className="container mx-auto flex-1 py-4">{children}</div>
    </div>
  );
}
