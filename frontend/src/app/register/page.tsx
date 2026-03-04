'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function RegisterPage() {
  const { login } = useAuth();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Error al registrarse');
      }
      const data = await res.json();
      login(data.token, data.nombre);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#030712', backgroundImage: 'radial-gradient(circle at 50% -20%, #064e3b30 0%, #030712 100%)'
    }}>
      <div style={{
        width: '100%', maxWidth: 400, padding: 40, background: '#0a1120',
        borderRadius: 16, border: '1px solid #1e293b', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ 
            fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: -0.5, marginBottom: 8,
            background: 'linear-gradient(135deg, #fff 0%, #4ade80 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            Crear Cuenta
          </h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>Únete al Tracker de Ingeniería</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {error && (
            <div style={{ padding: 12, borderRadius: 8, background: '#7f1d1d30', border: '1px solid #ef4444', color: '#f87171', fontSize: 13, textAlign: 'center' }}>
              {error}
            </div>
          )}
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Nombre Completo
            </label>
            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#030712', border: '1px solid #1e293b', color: '#fff', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Email
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#030712', border: '1px solid #1e293b', color: '#fff', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Contraseña
            </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#030712', border: '1px solid #1e293b', color: '#fff', outline: 'none' }} />
          </div>
          <button type="submit" style={{
            marginTop: 10, padding: '14px', borderRadius: 8, border: 'none', color: '#fff', fontWeight: 700,
            background: 'linear-gradient(135deg, #15803d 0%, #16a34a 100%)', cursor: 'pointer'
          }}>
            Empezar Ahora
          </button>
        </form>

        <p style={{ marginTop: 32, textAlign: 'center', color: '#64748b', fontSize: 14 }}>
          ¿Ya tienes cuenta? <Link href="/login" style={{ color: '#4ade80', textDecoration: 'none', fontWeight: 600 }}>Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
}