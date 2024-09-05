import useAppStore from "@/store";
import { Routes } from "@/utils/enums";
import { Navigate, Outlet } from "react-router-dom";


export const PrivateRouteUser = () => {
  const user = useAppStore((state) => state.user);

  if (!user.token) {
    return <Navigate to={Routes.LOGIN} replace />
  }

  // Renders child routes if authenticated
  return <Outlet />;
};

export const PrivateRouteClient = () => {
  const client = useAppStore((state) => state.client);

  if (!client.token) {
    return <Navigate to={Routes.LOGIN} replace />
  }

  // Renders child routes if authenticated
  return <Outlet />;
};
