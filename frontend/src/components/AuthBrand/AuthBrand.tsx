import { ESTADO_STYLES, EstadoVisual } from '@/types';

// Logo: un camino de materias conectadas (como el grafo de correlatividades) que termina en una aprobada.
function Logo() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" role="img" aria-label="UTN Tracker" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id="utn-logo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f46e5" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect width="46" height="46" rx="12" fill="url(#utn-logo-bg)" />
      <path d="M12 31 L21 17 L30 26 L36 13" fill="none" stroke="#ffffff" strokeOpacity=".55"
        strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="31" r="3.6" fill="#fff" />
      <circle cx="21" cy="17" r="3.6" fill="#fff" />
      <circle cx="30" cy="26" r="3.6" fill="#fff" />
      <circle cx="36" cy="13" r="5" fill="#4ade80" />
      <path d="M33.8 13.1 L35.4 14.7 L38.3 11.6" fill="none" stroke="#052e16"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FEATURES = [
  { estado: 'APROBADA' as EstadoVisual,   texto: 'Registrá el estado y la nota de cada materia' },
  { estado: 'DISPONIBLE' as EstadoVisual, texto: 'Mirá qué podés cursar según las correlatividades' },
  { estado: 'CURSANDO' as EstadoVisual,   texto: 'Seguí tu porcentaje de avance y tu promedio' },
];

interface Props {
  subtitle: string;
  showFeatures?: boolean;
}

export default function AuthBrand({ subtitle, showFeatures = false }: Props) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
        <Logo />
        <div>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: 0.8, color: '#64748b', textTransform: 'uppercase' }}>
            Ingeniería en Sistemas · UTN FRSF
          </p>
          <h1 style={{ margin: '2px 0 0', fontSize: 26, fontWeight: 800, letterSpacing: -0.5, color: '#f1f5f9' }}>
            UTN Tracker
          </h1>
        </div>
      </div>

      <p style={{ margin: 0, color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{subtitle}</p>

      {showFeatures && (
        <ul style={{ listStyle: 'none', padding: 0, margin: '18px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {FEATURES.map(f => (
            <li key={f.texto} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#94a3b8' }}>
              <span aria-hidden style={{
                width: 8, height: 8, borderRadius: 2, flexShrink: 0,
                background: ESTADO_STYLES[f.estado].border,
              }} />
              {f.texto}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
