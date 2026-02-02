import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for user on mount
    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("authToken");

            if (token) {
                try {
                    const res = await api.get("/users/me");
                    setUser(res.data);
                } catch (error) {
                    console.error("Auth check failed:", error);
                    localStorage.removeItem("authToken");
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setIsLoading(false);
        };

        checkUser();
    }, []);

    // LOGIN FUNCTION
    const login = async (email, password) => {
        try {
            const res = await api.post("/auth/login", { email, password });
            if (res.token) {
                localStorage.setItem("authToken", res.token);
                // After login, fetch the user details immediately
                const userRes = await api.get("/users/me");
                setUser(userRes.data);
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error; // Let the component handle the error UI
        }
    };

    // LOGOUT FUNCTION
    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#006C76]"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};