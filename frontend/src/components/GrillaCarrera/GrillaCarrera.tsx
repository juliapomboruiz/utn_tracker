'use client';

import { Materia, EstadoVisual } from '@/types';
import MateriaCard from '@/components/MateriaCard/MateriaCard';

interface Props {
  materias: Materia[];
  getEstadoVisual: (m: Materia) => EstadoVisual;
  onClickMateria: (m: Materia) => void;
}

const YEARS    = [1,2,3,4,5];
const ROWS     = [
  { c: 1, lbl: '1°\nCuat.' },
  { c: 0, lbl: 'Anual'     },
  { c: 2, lbl: '2°\nCuat.' },
];

export default function GrillaCarrera({ materias, getEstadoVisual, onClickMateria }: Props) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width:'100%', borderCollapse:'separate', borderSpacing:0, minWidth:820 }}>
        <thead>
          <tr>
            <th style={{ width:52, padding:'8px 4px 12px' }} />
            {YEARS.map(y => (
              <th key={y} style={{
                padding:'8px 8px 12px', textAlign:'center', color:'#6b82a0',
                fontSize:12, fontWeight:700, borderBottom:'1px solid #141e2e',
                borderLeft:'1px solid #0e1620', minWidth:172, letterSpacing:0.3,
              }}>
                {y}° AÑO
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map(({ c, lbl }) => (
            <tr key={c}>
              <td style={{
                padding:'5px 4px', textAlign:'right', verticalAlign:'middle',
                whiteSpace:'pre-line', fontSize:9.5, fontWeight:700,
                letterSpacing:0.4, lineHeight:1.4,
                color: c === 0 ? '#4f46e5' : '#2d3f55',
              }}>{lbl}</td>

              {YEARS.map(y => {
                const ms = materias.filter(m => m.anio === y && m.cuatrimestre === c);
                return (
                  <td key={y} style={{
                    padding:'5px 7px', verticalAlign:'top',
                    borderLeft:'1px solid #0e1620', borderTop:'1px solid #0e1620',
                    background: c === 0 ? '#07101a' : 'transparent',
                  }}>
                    <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                      {ms.length === 0
                        ? <div style={{ height:30, display:'flex', alignItems:'center',
                            justifyContent:'center', color:'#0e1620', fontSize:11 }}>—</div>
                        : ms.map(m => (
                          <MateriaCard
                            key={m.id}
                            materia={m}
                            estadoVisual={getEstadoVisual(m)}
                            onClick={() => onClickMateria(m)}
                          />
                        ))
                      }
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
