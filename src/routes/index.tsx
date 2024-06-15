import { LandingPage } from "@/pages/public/landing-page";
import { Routes } from "@/utils/enums";
import { Route, Routes as Routing } from "react-router-dom";

export const AppRoutes = () => {

  return (
    <Routing>
      <Route
        path={Routes.HOME}
        element={<LandingPage />}
      />
    </Routing>
  );
};
