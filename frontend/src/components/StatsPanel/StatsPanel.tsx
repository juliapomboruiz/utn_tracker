'use client';

import { useMemo } from 'react';
import { Materia } from '@/types';

interface Props { materias: Materia[]; }

function Pill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center',
      background:'#0a1120', border:`1px solid ${color}40`, borderRadius:10,
      padding:'8px 16px', minWidth:76 }}>
      <span style={{ fontSize:18, fontWeight:800, color, letterSpacing:-0.5 }}>{value}</span>
      <span style={{ fontSize:10, color:'#4a5f75', marginTop:1,
        textTransform:'uppercase', letterSpacing:0.5 }}>{label}</span>
    </div>
  );
}

export default function StatsPanel({ materias }: Props) {
  const stats = useMemo(() => {
    const total     = materias.length;
    const aprobadas = materias.filter(m => m.estado === 'APROBADA').length;
    const enCurso   = materias.filter(m => ['CURSANDO','REGULAR'].includes(m.estado)).length;
    const notas     = materias
      .filter(m => m.estado === 'APROBADA' && m.nota !== null)
      .map(m => m.nota as number);
    const promedio  = notas.length
      ? (notas.reduce((a,b) => a+b, 0) / notas.length).toFixed(2)
      : '—';
    const pct = total > 0 ? Math.round(aprobadas / total * 100) : 0;
    return { total, aprobadas, enCurso, promedio, pct };
  }, [materias]);

  return (
    <div style={{ background:'#080e1c', borderBottom:'1px solid #0e1a28', padding:'20px 24px' }}>
      <div style={{ maxWidth:1160, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between',
          alignItems:'flex-start', flexWrap:'wrap', gap:14 }}>
          <div>
            <div style={{ display:'flex', alignItems:'baseline', gap:10 }}>
              <h1 style={{ margin:0, fontSize:26, fontWeight:900, letterSpacing:-1,
                background:'linear-gradient(120deg,#818cf8 0%,#34d399 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                UTN · ISI
              </h1>
              <span style={{ fontSize:13, color:'#2d3f55', fontWeight:600 }}>Plan 2023</span>
            </div>
            <p style={{ margin:'3px 0 0', fontSize:13, color:'#2d3f55' }}>
              Ingeniería en Sistemas de Información · Santa Fe
            </p>
          </div>

          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            <Pill label="Avance"    value={`${stats.pct}%`}                     color="#818cf8" />
            <Pill label="Aprobadas" value={`${stats.aprobadas}/${stats.total}`} color="#34d399" />
            <Pill label="En curso"  value={String(stats.enCurso)}               color="#60a5fa" />
            <Pill label="Promedio"  value={stats.promedio}                       color="#fbbf24" />
          </div>
        </div>

        <div style={{ marginTop:14, background:'#0e1a28', borderRadius:99, height:4, overflow:'hidden' }}>
          <div style={{
            width:`${stats.pct}%`, height:'100%',
            background:'linear-gradient(90deg,#4f46e5,#34d399)',
            transition:'width 0.8s cubic-bezier(0.4,0,0.2,1)', borderRadius:99,
          }} />
        </div>
      </div>
    </div>
  );
}
