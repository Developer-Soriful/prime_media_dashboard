import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
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
            console.log("Login API Response:", res);

            if (res.success && res.data) {
                const token = res.data.session?.accessToken || res.data.token || res.data.session?.token;

                if (token) {
                    localStorage.setItem("authToken", token);
                    const userRes = await api.get("/users/me");
                    console.log("User Details Response:", userRes);
                    setUser(userRes.data?.user || userRes.data || userRes);
                } else {
                    console.warn("Token validation failed. Structure:", res);
                }
            } else if (res.token) {
                localStorage.setItem("authToken", res.token);
                const userRes = await api.get("/users/me");
                setUser(userRes.data);
            } else {
                console.warn("Unknown response structure:", res);
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
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

    const updateUser = (userData) => {
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
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