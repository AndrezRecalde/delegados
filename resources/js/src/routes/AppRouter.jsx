import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./public/PublicRoutes";
import { PrivateRoutes } from "./private/PrivateRoutes";
import { PrivatePages } from "./private/PrivatePages";
import { AuthenticationPage, CoordinadorViewPage, DelegadoViewPage, HomePage } from "../pages";
import { useAuthStore } from "../hooks";
import { RoutesNotFound } from "./not-found/RoutesNotFound";
import { ROLES } from "../helpers";
import { AdminPages } from "./private/AdminPages";
import { SupervisorPages } from "./private/SupervisorPages";
import { CoordPages } from "./private/CoordPages";
import { AuthGuard } from "./private/guard/AuthGuard";

export const AppRouter = () => {
    const { checkAuthToken } = useAuthStore();
    const token = localStorage.getItem("token");

    useEffect(() => {
        checkAuthToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const AuthRoutes = () => (
        <PublicRoutes>
            <Routes>
                <Route path="auth/login/*" element={<AuthenticationPage />} />
                <Route path="public/jrv/delegado/*" element={<DelegadoViewPage />} />
                <Route path="public/coordinador/*" element={<CoordinadorViewPage />} />

                <Route
                    path="/*"
                    element={<Navigate replace to="/auth/login" />}
                />
            </Routes>
        </PublicRoutes>
    );

    return (
        <RoutesNotFound>
            <Route path="/*" element={<AuthRoutes />} />

            <Route element={<HomePage />}>
                <Route
                    path="/gerencia/*"
                    element={
                        <PrivateRoutes requiredRole="Administrador">
                            <AdminPages />
                        </PrivateRoutes>
                    }
                />

                <Route
                    path="/supervisor/*"
                    element={
                        <PrivateRoutes requiredRole={ROLES.SUPERVISOR}>
                            <SupervisorPages />
                        </PrivateRoutes>
                    }
                />

                <Route
                    path="/coordinador/*"
                    element={
                        <PrivateRoutes requiredRole={ROLES.COORDINADOR}>
                            <CoordPages />
                        </PrivateRoutes>
                    }
                />

                <Route
                    path="/space/*"
                    element={
                        <AuthGuard>
                            <PrivatePages />
                        </AuthGuard>
                    }
                />
            </Route>
        </RoutesNotFound>
    );
};
