import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const email = localStorage.getItem('auth_email');
    if (token && email) {
      setUser({ token, email });
    }
  }, []);

  const login = (token: string, email: string) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_email', email);
    setUser({ token, email });
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_email');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
