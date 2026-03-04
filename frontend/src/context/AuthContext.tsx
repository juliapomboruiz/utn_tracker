'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (token: string, usuario: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Al cargar la página, buscamos si ya hay un token guardado
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('usuario');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

  const login = (newToken: string, newUser: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('usuario', newUser);
    document.cookie = `token=${newToken}; path=/; max-age=86400; SameSite=Lax`;
    setToken(newToken);
    setUser(newUser);
    router.push('/grilla');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    document.cookie = 'token=; path=/; max-age=0';
    setToken(null);
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);