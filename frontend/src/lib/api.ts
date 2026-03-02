import { Materia, Estado } from '@/types'; // <-- CORREGIDO: Usamos 'Estado' en vez de 'EstadoMateria'

// Detectamos si estamos en tu compu (localhost) o en la nube (cuando lo subas)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

/**
 * Función auxiliar para obtener el token guardado.
 * Devuelve un objeto que TypeScript entiende como Headers válidos.
 */
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
    headers: getAuthHeaders() as HeadersInit // <-- CORREGIDO: Usamos la función helper y casteamos
  });

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      console.error("Sesión expirada o inválida");
      // Aquí podrías redirigir al login si quisieras
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
  
  // 1. Verificamos qué headers estamos mandando (para depurar)
  const headers = getAuthHeaders();
  console.log("Enviando headers:", headers); 

  const res = await fetch(`${API_URL}/materias/${materiaId}/estado`, {
    method: 'PUT',
    headers: headers as HeadersInit, 
    body: JSON.stringify({ 
      estado: nuevoEstado,
      nota: nota,
      anioAcademico: anio,      
      cuatrimestreCursado: cuatrimestre
    }),
  });

  if (!res.ok) {
    // 2. Leemos el mensaje real del servidor
    const errorText = await res.text();
    console.error(`Error ${res.status} del servidor:`, errorText);
    
    // Lanzamos el error con el detalle
    throw new Error(`Error ${res.status}: ${errorText || 'Fallo desconocido'}`);
  }

  return res.json();
}