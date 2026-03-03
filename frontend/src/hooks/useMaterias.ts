'use client';

import { useState, useEffect, useCallback } from 'react';
import { Materia, Estado, EstadoVisual, UpdateEstadoPayload } from '@/types';
import { fetchMaterias as apiFetchMaterias, updateEstadoMateria } from '@/lib/api';

export function useMaterias() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  const fetchMaterias = useCallback(async () => {
    try {
      setLoading(true);
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

    const estadoMap: Record<number, Estado> = {};
    materias.forEach(mat => { estadoMap[mat.id] = mat.estado; });

    const cursarOk = m.correlativasCursar.every(id =>
      ['CURSANDO', 'REGULAR', 'APROBADA'].includes(estadoMap[id] ?? 'PENDIENTE')
    );
    const aprobarOk = m.correlativasAprobar.every(id =>
      estadoMap[id] === 'APROBADA'
    );

    return (cursarOk && aprobarOk) ? 'DISPONIBLE' : 'PENDIENTE';
  }, [materias]);

  /**
   * FIX: La firma ahora acepta (id, payload) en lugar de (id, estado, nota, anio, cuatrimestre).
   * Las páginas (grilla/page.tsx, grafo/page.tsx) llaman:
   *   await updateEstado(selected.id, payload)
   * donde payload = { estado, nota, anioAcademico, cuatrimestreCursado }
   * Antes se pasaba payload como segundo argumento esperando un string → el JSON
   * llegaba como { "estado": { "estado": "CURSANDO" } } y Jackson explotaba (403).
   */
  const updateEstado = useCallback(async (
    id: number,
    payload: UpdateEstadoPayload
  ) => {
    try {
      const updated = await updateEstadoMateria(
        id,
        payload.estado,
        payload.nota,
        payload.anioAcademico,
        payload.cuatrimestreCursado
      );
      setMaterias(prev => prev.map(m => m.id === id ? updated : m));
      return updated;
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      throw error;
    }
  }, []);

  return {
    materias,
    loading,
    error,
    getEstadoVisual,
    updateEstado,
    refetch: fetchMaterias,
  };
}