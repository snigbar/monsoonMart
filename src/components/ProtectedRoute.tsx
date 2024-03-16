import { useAppSelector } from "@/store/hooks/hooks";
import { TUserRole } from "@/store/store.interfaces";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface TProtectedRouteProps {
  children: ReactNode;
  role: TUserRole[];
}

const ProtectdRoute = ({ children, role }: TProtectedRouteProps) => {
  const authState = useAppSelector((state) => state.auth);
  if (!authState.isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  if (authState.role && !role.includes(authState.role)) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

export default ProtectdRoute;
