'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { API_BASE } from '@/lib/api';
import AuthBrand from '@/components/AuthBrand/AuthBrand';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setLoading(true);
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
      setLoading(false);
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
        <AuthBrand subtitle="Tu plan de estudios en un solo lugar: seguí tu avance en la carrera, materia por materia." showFeatures />

        <p style={{ margin: '0 0 14px', fontSize: 12, fontWeight: 700, letterSpacing: 0.6, color: '#64748b', textTransform: 'uppercase' }}>
          Iniciá sesión
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {error && (
            <div style={{ padding: 12, borderRadius: 8, background: '#7f1d1d30', border: '1px solid #ef4444', color: '#f87171', fontSize: 13, textAlign: 'center' }}>
              {error}
            </div>
          )}
          <input type="email" placeholder="Tu email" value={email} onChange={e => setEmail(e.target.value)} required
            style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#030712', border: '1px solid #1e293b', color: '#fff', outline: 'none' }} />
          <input type="password" placeholder="Tu contraseña" value={password} onChange={e => setPassword(e.target.value)} required
            style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#030712', border: '1px solid #1e293b', color: '#fff', outline: 'none' }} />
          <button type="submit" disabled={loading} style={{
            marginTop: 10, padding: '14px', borderRadius: 8, border: 'none', color: '#fff', fontWeight: 700,
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1
          }}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
          {loading && (
            <p style={{ color: '#64748b', fontSize: 12, textAlign: 'center', margin: 0 }}>
              Si el servidor estaba inactivo, la primera vez puede tardar hasta un minuto.
            </p>
          )}
        </form>

        <p style={{ marginTop: 24, textAlign: 'center', color: '#64748b', fontSize: 14 }}>
          ¿Todavía no tenés cuenta? <Link href="/register" style={{ color: '#818cf8', textDecoration: 'none', fontWeight: 600 }}>Creá una gratis</Link>
        </p>
      </div>
    </div>
  );
}