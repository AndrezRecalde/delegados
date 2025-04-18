import { Navigate, useLocation } from "react-router-dom";

export const AuthGuard = ({ redirectPath = "/auth/login", children }) => {
    const token = localStorage.getItem("token");
    let location = useLocation();

    return token ? (
        children
    ) : (
        <Navigate replace to={redirectPath} state={{ location }} />
    );
};
