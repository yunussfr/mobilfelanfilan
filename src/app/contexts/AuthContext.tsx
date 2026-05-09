import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  followers?: number;
  following?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for session
    const savedUser = localStorage.getItem('lezzettat_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    // Mock login
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate delay
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      followers: 127,
      following: 89
    };
    setUser(mockUser);
    localStorage.setItem('lezzettat_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const register = async (email: string, _password: string, name: string) => {
    // Mock register
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate delay
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      followers: 0,
      following: 0
    };
    setUser(mockUser);
    localStorage.setItem('lezzettat_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lezzettat_user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('lezzettat_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
