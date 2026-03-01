'use client';

import { useMemo, useState } from 'react';
import { Materia, EstadoVisual, ESTADO_STYLES } from '@/types';

interface Props {
  materias: Materia[];
  getEstadoVisual: (m: Materia) => EstadoVisual;
  onClickMateria: (m: Materia) => void;
}

const NW = 158, NH = 60, HG = 12, VG = 36, RH = NH + VG, LW = 78;

function buildLayout(materias: Materia[]) {
  const allRows = [1,2,3,4,5].flatMap(a => [
    { a, c:1 }, { a, c:0 }, { a, c:2 },
  ]);
  const rows = allRows.filter(r => materias.some(m => m.anio === r.a && m.cuatrimestre === r.c));
  const maxCols = Math.max(...rows.map(r =>
    materias.filter(m => m.anio === r.a && m.cuatrimestre === r.c).length
  ), 1);
  const cw = maxCols * NW + (maxCols - 1) * HG;
  const ch = rows.length * RH + 24;
  const pos: Record<number, { x:number; y:number; c:number }> = {};

  rows.forEach((row, ri) => {
    const ms = materias.filter(m => m.anio === row.a && m.cuatrimestre === row.c);
    const rowW = ms.length * NW + (ms.length - 1) * HG;
    const sx = (cw - rowW) / 2;
    ms.forEach((m, i) => {
      pos[m.id] = { x: sx + i*(NW+HG), y: ri*RH + 4, c: row.c };
    });
  });

  return { pos, cw, ch, totalW: LW + cw + 20, rows };
}

export default function GrafoCorrelativas({ materias, getEstadoVisual, onClickMateria }: Props) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const layout = useMemo(() => buildLayout(materias), [materias]);
  const { pos, cw, ch, totalW, rows } = layout;

  const edges = useMemo(() => {
    const result: { from:number; to:number; type:'cursar'|'aprobar' }[] = [];
    materias.forEach(m => {
      m.correlativasCursar.forEach(pid => {
        if (pos[pid] && pos[m.id]) result.push({ from:pid, to:m.id, type:'cursar' });
      });
      m.correlativasAprobar.forEach(pid => {
        if (pos[pid] && pos[m.id]) result.push({ from:pid, to:m.id, type:'aprobar' });
      });
    });
    return result;
  }, [materias, pos]);

  const { hlNodes, hlEdges } = useMemo(() => {
    if (hoveredId === null) return { hlNodes: new Set<number>(), hlEdges: new Set<string>() };
    const hovM = materias.find(m => m.id === hoveredId);
    if (!hovM) return { hlNodes: new Set<number>(), hlEdges: new Set<string>() };

    const nodes = new Set<number>([hoveredId]);
    const edgeKeys = new Set<string>();

    hovM.correlativasCursar.forEach(id => {
      nodes.add(id);
      edgeKeys.add(`${id}-${hoveredId}-cursar`);
    });
    hovM.correlativasAprobar.forEach(id => {
      nodes.add(id);
      edgeKeys.add(`${id}-${hoveredId}-aprobar`);
    });
    materias.forEach(m => {
      if (m.correlativasCursar.includes(hoveredId)) {
        nodes.add(m.id);
        edgeKeys.add(`${hoveredId}-${m.id}-cursar`);
      }
      if (m.correlativasAprobar.includes(hoveredId)) {
        nodes.add(m.id);
        edgeKeys.add(`${hoveredId}-${m.id}-aprobar`);
      }
    });
    return { hlNodes: nodes, hlEdges: edgeKeys };
  }, [hoveredId, materias]);

  const isHL = hoveredId !== null;

  return (
    <div style={{ overflowX:'auto', overflowY:'auto', maxHeight:'72vh',
      background:'#060c16', borderRadius:12, border:'1px solid #0e1a28' }}>
      <div style={{ position:'relative', width:totalW, height:ch,
        paddingLeft:LW, boxSizing:'border-box',  margin:'0 auto' }}>

        {/* Fondo filas anuales */}
        {rows.map((row, ri) => row.c === 0 ? (
          <div key={`bg-${row.a}`} style={{
            position:'absolute', left:LW, right:0, top:ri*RH, height:NH+4,
            background:'#07101a', pointerEvents:'none',
          }} />
        ) : null)}

        {/* Labels de fila */}
        {rows.map((row, ri) => (
          <div key={`lbl-${row.a}-${row.c}`} style={{
            position:'absolute', left:0, top:ri*RH+4, width:LW-6, height:NH,
            display:'flex', flexDirection:'column', justifyContent:'center',
            alignItems:'flex-end', paddingRight:8, pointerEvents:'none',
          }}>
            <span style={{ fontSize:9.5, fontWeight:700, lineHeight:1.3, textAlign:'right',
              color: row.c === 0 ? '#4f46e5' : '#1e2d3d' }}>
              {row.a}°{'\n'}{row.c === 0 ? 'Anual' : `${row.c}°C`}
            </span>
          </div>
        ))}

        {/* Separadores */}
        {rows.map((_, ri) => ri > 0 ? (
          <div key={`sep-${ri}`} style={{
            position:'absolute', left:LW, right:0, top:ri*RH,
            height:1, background:'#0c1520', pointerEvents:'none',
          }} />
        ) : null)}

        {/* SVG flechas */}
        <svg style={{ position:'absolute', left:LW, top:0,
          pointerEvents:'none', overflow:'visible' }} width={cw} height={ch}>
          <defs>
            {(['cursar','aprobar'] as const).flatMap(t => [0,1].map(hl => {
              const fill = t === 'cursar'
                ? (hl ? '#60a5fa' : '#1e40af')
                : (hl ? '#fbbf24' : '#92400e');
              return (
                <marker key={`${t}-${hl}`} id={`arr-${t}-${hl}`}
                  markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                  <path d="M0,0 L7,3.5 L0,7 Z" fill={fill} />
                </marker>
              );
            }))}
          </defs>

          {edges.map(({ from, to, type }) => {
            const fp = pos[from], tp = pos[to];
            if (!fp || !tp) return null;
            const key = `${from}-${to}-${type}`;
            const hl = hlEdges.has(key) ? 1 : 0;
            const dim = isHL && !hl;
            const fx = fp.x+NW/2, fy = fp.y+NH;
            const tx = tp.x+NW/2, ty = tp.y;
            const dv = Math.abs(ty-fy);
            const d = `M${fx} ${fy} C${fx} ${fy+dv*0.45},${tx} ${ty-dv*0.45},${tx} ${ty}`;
            return (
              <path key={key} d={d} fill="none"
                stroke={hl ? (type==='cursar' ? '#60a5fa' : '#fbbf24') : (type==='cursar' ? '#1e3a5f' : '#4a2a00')}
                strokeWidth={hl ? 2 : 1}
                opacity={dim ? 0.03 : hl ? 0.95 : 0.22}
                markerEnd={`url(#arr-${type}-${hl})`}
              />
            );
          })}
        </svg>

        {/* Nodos */}
        {materias.map(m => {
          const p = pos[m.id];
          if (!p) return null;
          const ev = getEstadoVisual(m);
          const s  = ESTADO_STYLES[ev];
          const hl = hlNodes.has(m.id);
          const dim = isHL && !hl;
          return (
            <div key={m.id}
              onClick={() => onClickMateria(m)}
              onMouseEnter={() => setHoveredId(m.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                position:'absolute', left:LW+p.x, top:p.y,
                width:NW, height:NH, boxSizing:'border-box',
                background:s.bg, border:`2px solid ${s.border}`, borderRadius:9,
                padding:'7px 10px', cursor:'pointer',
                opacity: dim ? 0.15 : 1,
                transform: hl ? 'scale(1.06)' : 'scale(1)',
                boxShadow: hl ? `0 0 24px ${s.glow},0 4px 12px #00000066` : '0 2px 4px #00000033',
                transition:'all 0.15s', zIndex: hl ? 10 : 1,
                display:'flex', flexDirection:'column', justifyContent:'space-between',
              }}
            >
              <span style={{ fontSize:9.5, color:s.text, fontWeight:500, lineHeight:1.3,
                overflow:'hidden', display:'-webkit-box',
                WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
                {m.nombre}
              </span>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:8, color:s.border, fontWeight:700, letterSpacing:0.4 }}>
                  {s.label.toUpperCase()}
                </span>
                <div style={{ display:'flex', gap:4, alignItems:'center' }}>
                  {m.esLibre && <span style={{ fontSize:7.5, color:'#a78bfa', fontWeight:700 }}>LIBRE</span>}
                  {m.nota !== null && (
                    <span style={{ fontSize:10, fontWeight:800, color:s.text }}>{m.nota}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leyenda */}
      <div style={{ padding:'8px 16px', borderTop:'1px solid #0e1a28',
        display:'flex', gap:20, alignItems:'center', background:'#060c16', flexWrap:'wrap' }}>
        <span style={{ fontSize:10, color:'#2d3f55', fontWeight:600 }}>Flechas:</span>
        {[
          ['Para cursar',  '#60a5fa'],
          ['Para rendir',  '#fbbf24'],
        ].map(([lbl, col]) => (
          <span key={lbl} style={{ display:'flex', alignItems:'center', gap:5, fontSize:10, color:col }}>
            <span style={{ width:24, height:1.5, background:col, display:'inline-block', borderRadius:1 }} />
            {lbl}
          </span>
        ))}
        <span style={{ marginLeft:'auto', fontSize:10, color:'#2d3f55' }}>
          Hover para ver correlatividades
        </span>
      </div>
    </div>
  );
}
