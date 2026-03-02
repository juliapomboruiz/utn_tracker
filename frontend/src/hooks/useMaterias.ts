'use client';

import { useState, useEffect, useCallback } from 'react';
import { Materia, Estado, EstadoVisual } from '@/types'; // Quitamos UpdateEstadoPayload si da error, o lo dejamos si existe
import { fetchMaterias as apiFetchMaterias, updateEstadoMateria } from '@/lib/api'; // <--- CAMBIO IMPORTANTE

export function useMaterias() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  const fetchMaterias = useCallback(async () => {
    try {
      setLoading(true);
      // Usamos la función importada directamente
      const data = await apiFetchMaterias(); 
      setMaterias(data);
    } catch (e: any) {
      setError(e.message ?? 'Error al cargar materias');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMaterias();
  }, [fetchMaterias]);

  const getEstadoVisual = useCallback((m: Materia): EstadoVisual => {
    if (m.estado !== 'PENDIENTE') return m.estado;

    // Mapa rápido de estados para chequear correlativas
    const estadoMap: Record<number, Estado> = {};
    materias.forEach(mat => { estadoMap[mat.id] = mat.estado; });

    // Lógica de correlativas
    const cursarOk = m.correlativasCursar.every(id =>
      ['CURSANDO','REGULAR','APROBADA'].includes(estadoMap[id] ?? 'PENDIENTE')
    );
    const aprobarOk = m.correlativasAprobar.every(id =>
      estadoMap[id] === 'APROBADA'
    );

    return (cursarOk && aprobarOk) ? 'DISPONIBLE' : 'PENDIENTE';
  }, [materias]);

  const updateEstado = useCallback(async (
    id: number, 
    nuevoEstado: Estado, 
    nota?: number | null, 
    anio?: number | null, 
    cuatrimestre?: number | null
  ) => {
    try {
      // Usamos la función importada directamente
      const updated = await updateEstadoMateria(id, nuevoEstado, nota, anio, cuatrimestre);
      
      setMaterias(prev => prev.map(m => m.id === id ? updated : m));
      return updated;
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      throw error;
    }
  }, []);

  return { 
    materias, 
    loading, 
    error, 
    getEstadoVisual, 
    updateEstado, 
    refetch: fetchMaterias 
  };
}