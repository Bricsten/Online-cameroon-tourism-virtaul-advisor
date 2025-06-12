import React, { createContext, useContext, useState } from 'react';
import { AdminState, AdminCredentials } from '../types/admin';

interface AdminContextType {
  admin: AdminState;
  login: (credentials: AdminCredentials) => Promise<void>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_CREDENTIALS = {
  username: 'kendi',
  password: '1234'
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminState>({
    isAuthenticated: false,
    username: null
  });

  const login = async (credentials: AdminCredentials) => {
    if (
      credentials.username === ADMIN_CREDENTIALS.username &&
      credentials.password === ADMIN_CREDENTIALS.password
    ) {
      setAdmin({
        isAuthenticated: true,
        username: credentials.username
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setAdmin({
      isAuthenticated: false,
      username: null
    });
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};