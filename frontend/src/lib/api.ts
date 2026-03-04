import { Materia, Estado } from '@/types';

// En local usa localhost. En producción (Vercel) usa la URL de Koyeb.
const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080') + '/api';

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function fetchMaterias(): Promise<Materia[]> {
  const res = await fetch(`${API_URL}/materias`, {
    headers: getAuthHeaders() as HeadersInit,
  });

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      console.error('Sesión expirada o inválida');
    }
    throw new Error('Error al cargar materias');
  }
  return res.json();
}

export async function updateEstadoMateria(
  materiaId: number,
  nuevoEstado: Estado,
  nota?: number | null,
  anio?: number | null,
  cuatrimestre?: number | null
): Promise<Materia> {
  const res = await fetch(`${API_URL}/materias/${materiaId}/estado`, {
    method: 'PUT',
    headers: getAuthHeaders() as HeadersInit,
    body: JSON.stringify({
      estado: nuevoEstado,
      nota: nota,
      anioAcademico: anio,
      cuatrimestreCursado: cuatrimestre,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Error ${res.status} del servidor:`, errorText);
    throw new Error(`Error ${res.status}: ${errorText || 'Fallo desconocido'}`);
  }

  return res.json();
}