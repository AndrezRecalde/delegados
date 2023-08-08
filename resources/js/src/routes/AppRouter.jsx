import { Route, Routes } from "react-router-dom";
import { PublicRoute } from "./public/PublicRoute";
import { PrivateRoute } from "./private/PrivateRoute";
import { PrivatePages } from "./private/PrivatePages";
import { AuthenticationPage } from "../pages";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = () => {
  const { checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  

  return (
    <Routes>
      <Route
        path="/auth/login/*"
        element={
          <PublicRoute>
            <Routes>
              <Route path="/" element={<AuthenticationPage />} />
            </Routes>
          </PublicRoute>
        }
      />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <PrivatePages />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
