export type Estado = 'PENDIENTE' | 'CURSANDO' | 'REGULAR' | 'APROBADA';

export type EstadoVisual = Estado | 'DISPONIBLE';

export interface Materia {
  id: number;
  nombre: string;
  anio: number;
  cuatrimestre: number;       // 0 = Anual, 1 = 1°C, 2 = 2°C
  esLibre: boolean;
  esConfigurable: boolean;
  correlativasCursar: number[];
  correlativasAprobar: number[];
  estado: Estado;
  nota: number | null;
  anioAcademico: number | null;
  cuatrimestreCursado: number | null;
  esElectiva: boolean;
  creditos: number;
}

export interface Progreso {
  totalMaterias: number;
  aprobadas: number;
  enCurso: number;
  pendientes: number;
  porcentaje: number;
  promedio: number | null;
  creditosElectivas: number;
}

export interface UpdateEstadoPayload {
  estado: Estado;
  nota?: number | null;
  anioAcademico?: number | null;
  cuatrimestreCursado?: number | null;
}

export const ESTADO_STYLES: Record<EstadoVisual, {
  label: string;
  bg: string;
  border: string;
  text: string;
  glow: string;
}> = {
  PENDIENTE:  { label: 'Pendiente',  bg: '#0d1520', border: '#2d3f55', text: '#4a5f75', glow: 'transparent' },
  DISPONIBLE: { label: 'Disponible', bg: '#130d2a', border: '#6d28d9', text: '#a78bfa', glow: '#6d28d930'   },
  CURSANDO:   { label: 'Cursando',   bg: '#071630', border: '#1d4ed8', text: '#60a5fa', glow: '#1d4ed830'   },
  REGULAR:    { label: 'Regular',    bg: '#1a0f00', border: '#b45309', text: '#fbbf24', glow: '#b4530930'   },
  APROBADA:   { label: 'Aprobada',   bg: '#031a0c', border: '#15803d', text: '#4ade80', glow: '#15803d30'   },
};
