// Includes to use the repeated code for fetching the current logged in user by access token

import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/authServices";

export const AuthContext = createContext();

function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);

    const token = localStorage.getItem("access_token")

    useEffect(() => {
        const fetchUser = async () => {
            if(!token) {
                setloading(false);
                return;
            }
            try {
                const response = await getCurrentUser(token);
                if(response.success){
                    setUser(response.user);
                }
            }
            catch(error){
                localStorage.removeItem("access_token");
            }
            setloading(false);
        };
        fetchUser();
    },[token]);

    const login = (token) => {
        localStorage.setItem(
            "access_token",
            token
        );
    };

    const logout = () => {
        localStorage.removeItem(
            "access_token"
        );
        setUser(null);
    };
    return (
        <AuthContext.Provider
            value = {{
                user,
                token,
                loading,
                login,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;