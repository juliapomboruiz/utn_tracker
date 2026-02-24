'use client';

import { useState } from 'react';
import { Materia, Estado, UpdateEstadoPayload, ESTADO_STYLES } from '@/types';

interface Props {
  materia: Materia;
  materias: Materia[];
  onSave: (payload: UpdateEstadoPayload) => Promise<void>;
  onClose: () => void;
}

const OPTS: Estado[] = ['PENDIENTE', 'CURSANDO', 'REGULAR', 'APROBADA'];

function cLabel(c: number) {
  return c === 0 ? 'Anual' : c === 1 ? '1° Cuatrimestre' : '2° Cuatrimestre';
}

export default function EditarEstadoModal({ materia: m, materias, onSave, onClose }: Props) {
  const [estado,   setEstado]   = useState<Estado>(m.estado);
  const [nota,     setNota]     = useState(m.nota !== null ? String(m.nota) : '');
  const [saving,   setSaving]   = useState(false);

  const hasNota = estado === 'REGULAR' || estado === 'APROBADA';
  const nombre  = (id: number) => materias.find(x => x.id === id)?.nombre ?? `#${id}`;

  async function handleSave() {
    setSaving(true);
    try {
      await onSave({
        estado,
        nota: hasNota && nota !== '' ? parseFloat(nota) : null,
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      style={{ position:'fixed', inset:0, background:'#000000cc',
        display:'flex', alignItems:'center', justifyContent:'center',
        zIndex:200, backdropFilter:'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background:'#0a1120', border:'1px solid #1a2a3d', borderRadius:16,
        padding:28, width:420, maxWidth:'95vw', boxShadow:'0 32px 64px #000c' }}>

        {/* Header */}
        <div style={{ marginBottom:18 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
                <span style={{ fontSize:11, color:'#2d3f55', fontWeight:700 }}>
                  MATERIA #{m.id}
                </span>
                {m.esLibre && (
                  <span style={{ fontSize:9, fontWeight:700, color:'#a78bfa',
                    background:'#7c3aed20', borderRadius:4, padding:'2px 7px', letterSpacing:0.3 }}>
                    ✦ SE PUEDE RENDIR LIBRE
                  </span>
                )}
              </div>
              <h3 style={{ margin:'0 0 2px', fontSize:16, color:'#e2e8f0', fontWeight:700 }}>
                {m.nombre}
              </h3>
              <span style={{ fontSize:12, color:'#4a5f75' }}>
                {m.anio}° Año · {cLabel(m.cuatrimestre)}
              </span>
            </div>
            <button onClick={onClose} style={{ background:'none', border:'none',
              color:'#4a5f75', cursor:'pointer', fontSize:20, padding:'0 4px', lineHeight:1 }}>
              ✕
            </button>
          </div>
        </div>

        {/* Estado */}
        <p style={{ fontSize:11, color:'#4a5f75', marginBottom:8, fontWeight:700, letterSpacing:0.5 }}>
          ESTADO
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:18 }}>
          {OPTS.map(opt => {
            const s = ESTADO_STYLES[opt];
            const active = estado === opt;
            return (
              <button key={opt} onClick={() => setEstado(opt)} style={{
                padding:'10px 14px', borderRadius:9, cursor:'pointer', textAlign:'left',
                border:`2px solid ${active ? s.border : '#0e1a28'}`,
                background: active ? s.bg : '#080e1a',
                color: active ? s.text : '#2d3f55',
                fontSize:12, fontWeight: active ? 700 : 500, transition:'all 0.15s',
              }}>
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Nota */}
        {hasNota && (
          <div style={{ marginBottom:18 }}>
            <p style={{ fontSize:11, color:'#4a5f75', marginBottom:8, fontWeight:700, letterSpacing:0.5 }}>
              NOTA FINAL
            </p>
            <input
              type="number" min="1" max="10" step="0.25"
              value={nota} onChange={e => setNota(e.target.value)}
              placeholder="1 — 10"
              style={{ width:'100%', padding:'10px 14px', boxSizing:'border-box',
                background:'#080e1a', border:'1px solid #1a2a3d', borderRadius:9,
                color:'#e2e8f0', fontSize:15, outline:'none' }}
            />
          </div>
        )}

        {/* Correlatividades */}
        {(m.correlativasCursar.length > 0 || m.correlativasAprobar.length > 0) && (
          <div style={{ background:'#060c16', borderRadius:9, padding:'10px 14px', marginBottom:18 }}>
            <p style={{ fontSize:10, color:'#2d3f55', margin:'0 0 6px', fontWeight:700, letterSpacing:0.5 }}>
              CORRELATIVIDADES
            </p>
            {m.correlativasCursar.length > 0 && (
              <p style={{ margin:'0 0 5px', fontSize:11, lineHeight:1.65 }}>
                <span style={{ color:'#60a5fa', fontWeight:600 }}>Para cursar: </span>
                <span style={{ color:'#3b5aad' }}>{m.correlativasCursar.map(nombre).join(', ')}</span>
              </p>
            )}
            {m.correlativasAprobar.length > 0 && (
              <p style={{ margin:0, fontSize:11, lineHeight:1.65 }}>
                <span style={{ color:'#fbbf24', fontWeight:600 }}>Para rendir: </span>
                <span style={{ color:'#7a4800' }}>{m.correlativasAprobar.map(nombre).join(', ')}</span>
              </p>
            )}
          </div>
        )}

        {/* Botones */}
        <div style={{ display:'flex', gap:10 }}>
          <button onClick={onClose} style={{ flex:1, padding:11, background:'transparent',
            border:'1px solid #1a2a3d', borderRadius:9, color:'#4a5f75',
            cursor:'pointer', fontSize:13, fontWeight:600 }}>
            Cancelar
          </button>
          <button onClick={handleSave} disabled={saving} style={{
            flex:2, padding:11, border:'none', borderRadius:9, cursor:'pointer',
            fontSize:13, fontWeight:700,
            background:'linear-gradient(135deg,#4f46e5,#7c3aed)', color:'#fff',
            boxShadow:'0 4px 16px #4f46e544', opacity: saving ? 0.7 : 1,
            transition:'opacity 0.15s',
          }}>
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}
