import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

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
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    checkLoginStatus: async () => null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const checkLoginStatus = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setIsAuthenticated(false);
            setUser(null);
            return null;
        }

        try {
            const response = await axios.get('http://localhost:5000/users/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
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
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    return <AuthContext.Provider value={{ isAuthenticated, user, checkLoginStatus }}>{children}</AuthContext.Provider>;
};
