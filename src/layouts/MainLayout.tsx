import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto flex flex-col min-h-screen px-0">
      {/* navbar */}
      <div className="p-4 w-full "></div>
      <div className="container mx-auto flex-1 py-4">{children}</div>
    </div>
  );
}
