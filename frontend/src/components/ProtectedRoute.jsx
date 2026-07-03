// This page implements the feature to prevent redirecting to other pages without logging in

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function ProtectedRoute({children}) {
    const {
        isAuthenticated,
        loading
    } = useContext(AuthContext);

    if(loading) {
        return <h2>Loading . . .</h2>;
    }
    if(!isAuthenticated){
        return <Navigate to="/login" />;
    }
    return children;
}

export default ProtectedRoute;