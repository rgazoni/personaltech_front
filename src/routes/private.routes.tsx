import { useAppSelector } from "@/features/store";
import { Routes } from "@/utils/enums";
import { Navigate, Outlet } from "react-router-dom";


export const PrivateRoute = () => {
  const { user } = useAppSelector((state) => state.user);
  if (user.is_authenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to={Routes.LOGIN} replace />;
  }

  // Renders child routes if authenticated
  return <Outlet />;
};
