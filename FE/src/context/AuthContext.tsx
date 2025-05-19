import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    checkLoginStatus: () => Promise<User | null>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    checkLoginStatus: async () => null,
    loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const checkLoginStatus = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setIsAuthenticated(false);
            setUser(null);
            return null;
        }

        try {
            const response = await axiosInstance.get('/users/me');
            const userData = response.data.result;
            setUser(userData);
            setIsAuthenticated(true);
            return userData;
        } catch (error) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setIsAuthenticated(false);
            setUser(null);
            return null;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    return <AuthContext.Provider value={{ isAuthenticated, user, checkLoginStatus, loading }}>{children}</AuthContext.Provider>;
};
