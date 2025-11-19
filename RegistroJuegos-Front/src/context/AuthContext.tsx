import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));

    const login = () => setIsAuthenticated(true);
    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    // Sincroniza si abres/cambias en otra pestaña
    useEffect(() => {
        const handler = () => setIsAuthenticated(!!localStorage.getItem("token"));
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be inside AuthProvider!");
    return ctx;
}