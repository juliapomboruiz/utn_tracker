import { Materia, Progreso, UpdateEstadoPayload } from '@/types';

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  /**
   * Trae todas las materias con correlativas y estado actual.
   */
  getMaterias(): Promise<Materia[]> {
    return fetch(`${BASE}/materias`, { cache: 'no-store' })
      .then(res => handleResponse<Materia[]>(res));
  },

  /**
   * Actualiza el estado (y nota) de una materia.
   */
  updateEstado(id: number, payload: UpdateEstadoPayload): Promise<Materia> {
    return fetch(`${BASE}/materias/${id}/estado`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(res => handleResponse<Materia>(res));
  },

  /**
   * Estadísticas generales de la carrera.
   */
  getProgreso(): Promise<Progreso> {
    return fetch(`${BASE}/progreso`, { cache: 'no-store' })
      .then(res => handleResponse<Progreso>(res));
  },
};
