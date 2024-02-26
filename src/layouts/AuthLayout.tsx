import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container flex justify-center items-center min-h-screen bg-slate-200">
      {children}
    </div>
  );
}
