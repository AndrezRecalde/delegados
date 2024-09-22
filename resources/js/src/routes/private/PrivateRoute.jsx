/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({
    token,
    redirectPath = "/auth/login",
    children,
}) => {
    return !token ? <Navigate to={redirectPath} replace /> : children;
};
