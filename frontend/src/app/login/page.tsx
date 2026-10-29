'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { API_BASE } from '@/lib/api';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('Credenciales incorrectas');
      const data = await res.json();
      login(data.token, data.nombre);
    } catch (err) {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#030712', backgroundImage: 'radial-gradient(circle at 50% -20%, #1e1b4b 0%, #030712 100%)'
    }}>
      <div style={{
        width: '100%', maxWidth: 400, padding: 40, background: '#0a1120',
        borderRadius: 16, border: '1px solid #1e293b', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ 
            fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: -0.5, marginBottom: 8,
            background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            Bienvenido
          </h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>Ingresa tus credenciales</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {error && (
            <div style={{ padding: 12, borderRadius: 8, background: '#7f1d1d30', border: '1px solid #ef4444', color: '#f87171', fontSize: 13, textAlign: 'center' }}>
              {error}
            </div>
          )}
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required
            style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#030712', border: '1px solid #1e293b', color: '#fff', outline: 'none' }} />
          <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required
            style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#030712', border: '1px solid #1e293b', color: '#fff', outline: 'none' }} />
          <button type="submit" style={{
            marginTop: 10, padding: '14px', borderRadius: 8, border: 'none', color: '#fff', fontWeight: 700,
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', cursor: 'pointer'
          }}>
            Ingresar
          </button>
        </form>

        <p style={{ marginTop: 20, textAlign: 'center' }}>
          <Link href="/register" style={{ color: '#818cf8', fontSize: 14, textDecoration: 'none' }}>Crear cuenta con Email</Link>
        </p>
      </div>
    </div>
  );
}