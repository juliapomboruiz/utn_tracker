'use client';

import Link from 'next/link';

interface Props { active: 'grilla' | 'grafo'; }

export default function NavTabs({ active }: Props) {
  const tabs = [
    { key: 'grilla', href: '/grilla', label: '⊞  Grilla'           },
    { key: 'grafo',  href: '/grafo',  label: '⬡  Correlatividades' },
  ] as const;

  return (
    <div style={{ maxWidth:1160, margin:'0 auto',
      padding:'12px 24px', display:'flex', gap:16, alignItems:'center', flexWrap:'wrap' }}>
      <div style={{ display:'inline-flex', background:'#0a1120',
        borderRadius:10, padding:3, gap:3, border:'1px solid #0e1a28' }}>
        {tabs.map(t => (
          <Link key={t.key} href={t.href} style={{
            padding:'7px 20px', borderRadius:7, fontSize:12, fontWeight:700,
            letterSpacing:0.3, textDecoration:'none', transition:'all 0.2s',
            background: active === t.key
              ? 'linear-gradient(135deg,#4f46e5,#7c3aed)' : 'transparent',
            color: active === t.key ? '#fff' : '#4a5f75',
          }}>
            {t.label}
          </Link>
        ))}
      </div>

      <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap' }}>
        {[
          ['Pendiente',  '#2d3f55'],
          ['Disponible', '#7c3aed'],
          ['Cursando',   '#1d4ed8'],
          ['Regular',    '#b45309'],
          ['Aprobada',   '#15803d'],
        ].map(([lbl, col]) => (
          <span key={lbl} style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, color:'#4a5f75' }}>
            <span style={{ width:8, height:8, borderRadius:2, background:col, flexShrink:0 }} />
            {lbl}
          </span>
        ))}
      </div>
    </div>
  );
}
