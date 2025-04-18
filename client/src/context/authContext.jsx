import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState( localStorage.getItem('user') || null);
    const [role, setRole] = useState(localStorage.getItem('userRole') || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const updateUser = (userData) => {
        setUser(userData);
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            localStorage.removeItem('user');
        }
    };

    const updateRole = (newRole) => {
        setRole(newRole);
        if (newRole) {
            localStorage.setItem('userRole', newRole);
        } else {
            localStorage.removeItem('userRole');
        }
    };

    const updateToken = (newToken) => {
        setToken(newToken);
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }
    };

    const logout = () => {
        setUser(null);
        setRole(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        // localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                role, 
                token,
                updateUser,
                updateRole,
                updateToken,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);