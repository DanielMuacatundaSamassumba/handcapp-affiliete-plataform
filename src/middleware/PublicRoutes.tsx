import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }: any) => {
    const token = localStorage.getItem("auth_token");

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export {
    PublicRoutes
}
