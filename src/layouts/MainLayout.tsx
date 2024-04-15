import { Navbar } from "@/components/Navbar/Navbar";
import Promobar from "@/components/Navbar/Promobar";
import { LoadingSpinner } from "@/components/ui/spinner";
import { useAppSelector } from "@/store/hooks/hooks";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  const loading = useAppSelector((state) => state.auth.loading);
  return (
    <div className="container mx-auto flex flex-col min-h-screen px-0">
      {/* promobar */}
      <Promobar message="This week - 20% flash sale" />
      {/* navbar */}
      <Navbar></Navbar>
      {loading && (
        <div className="h-full w-full bg-white/60 fixed z-50 flex justify-center items-center">
          <LoadingSpinner className="h-16 w-16" />
        </div>
      )}
      <div className="container mx-auto flex-1 py-4">{children}</div>
    </div>
  );
}
