'use client';

import { Materia, EstadoVisual, ESTADO_STYLES } from '@/types';

interface Props {
  materia: Materia;
  estadoVisual: EstadoVisual;
  onClick: () => void;
}

export default function MateriaCard({ materia: m, estadoVisual, onClick }: Props) {
  const s = ESTADO_STYLES[estadoVisual];

  return (
    <div
      onClick={onClick}
      style={{
        background: s.bg, border: `1.5px solid ${s.border}`, borderRadius: 8,
        padding: '7px 10px', cursor: 'pointer',
        transition: 'transform 0.12s, box-shadow 0.12s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${s.glow}`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = '';
        (e.currentTarget as HTMLElement).style.boxShadow = '';
      }}
    >
      <div style={{ display:'flex', justifyContent:'space-between',
        alignItems:'flex-start', gap:4, marginBottom:3 }}>
        <span style={{ fontSize:10.5, color:s.text, fontWeight:500,
          lineHeight:1.35, flex:1 }}>{m.nombre}</span>

        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:2, flexShrink:0 }}>
          {m.nota !== null && (
            <span style={{ fontSize:10, fontWeight:800, color:s.border,
              background:`${s.border}18`, borderRadius:4, padding:'1px 5px' }}>
              {m.nota}
            </span>
          )}
          {m.esLibre && (
            <span style={{ fontSize:7.5, fontWeight:700, color:'#a78bfa',
              background:'#7c3aed20', borderRadius:3, padding:'1px 4px', letterSpacing:0.3 }}>
              LIBRE
            </span>
          )}
        </div>
      </div>

      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <span style={{ fontSize:8.5, fontWeight:700, color:s.border, letterSpacing:0.4 }}>
          {s.label.toUpperCase()}
        </span>
        <span style={{ fontSize:8.5, color:'#1e2d3d' }}>#{m.id}</span>
      </div>
    </div>
  );
}
