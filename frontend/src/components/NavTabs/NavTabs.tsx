'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

interface Props { active: 'grilla' | 'grafo'; }

export default function NavTabs({ active }: Props) {
  const { logout, user } = useAuth(); 

  const tabs = [
    { key: 'grilla', href: '/grilla', label: '⊞  Grilla'           },
    { key: 'grafo',  href: '/grafo',  label: '⬡  Correlatividades' },
  ] as const;

  return (
    <div style={{ 
      maxWidth: 1160, 
      margin: '0 auto',
      padding: '12px 24px', 
      display: 'flex', 
      gap: 16, 
      alignItems: 'center', 
      flexWrap: 'wrap' 
    }}>
      {/* Tabs de Navegación */}
      <div style={{ 
        display: 'inline-flex', 
        background: '#0a1120',
        borderRadius: 10, 
        padding: 3, 
        gap: 3, 
        border: '1px solid #0e1a28' 
      }}>
        {tabs.map(t => (
          <Link key={t.key} href={t.href} style={{
            padding: '7px 20px', 
            borderRadius: 7, 
            fontSize: 12, 
            fontWeight: 700,
            letterSpacing: 0.3, 
            textDecoration: 'none', 
            transition: 'all 0.2s',
            background: active === t.key
              ? 'linear-gradient(135deg,#4f46e5,#7c3aed)' : 'transparent',
            color: active === t.key ? '#fff' : '#4a5f75',
          }}>
            {t.label}
          </Link>
        ))}
      </div>

      {/* Leyenda de Colores */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        {[
          ['Pendiente',  '#2d3f55'],
          ['Disponible', '#7c3aed'],
          ['Cursando',   '#1d4ed8'],
          ['Regular',    '#b45309'],
          ['Aprobada',   '#15803d'],
        ].map(([lbl, col]) => (
          <span key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#4a5f75' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: col, flexShrink: 0 }} />
            {lbl}
          </span>
        ))}
      </div>

      {/* SECCIÓN DE USUARIO Y LOGOUT (Añadida) */}
      <div style={{ 
        marginLeft: 'auto', 
        display: 'flex', 
        gap: 16, 
        alignItems: 'center' 
      }}>
        <span style={{ fontSize: 12, color: '#6b82a0', fontWeight: 500 }}>
          {user}
        </span>
        <button 
          onClick={logout}
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            color: '#ef4444',
            padding: '6px 14px',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 11,
            fontWeight: 700,
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#ef4444', e.currentTarget.style.color = '#fff')}
          onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)', e.currentTarget.style.color = '#ef4444')}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}