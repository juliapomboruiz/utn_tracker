'use client';

import { useState, useEffect, useCallback } from 'react';
import { Materia, Estado, EstadoVisual, UpdateEstadoPayload } from '@/types';
import { api } from '@/lib/api';

export function useMaterias() {
  const [materias, setMaterias]   = useState<Materia[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  const fetchMaterias = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getMaterias();
      setMaterias(data);
    } catch (e: any) {
      setError(e.message ?? 'Error al cargar materias');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMaterias(); }, [fetchMaterias]);

  /**
   * Determina el estado visual de una materia:
   * si está PENDIENTE pero cumple correlativas → DISPONIBLE
   */
  const getEstadoVisual = useCallback((m: Materia): EstadoVisual => {
    if (m.estado !== 'PENDIENTE') return m.estado;

    const estadoMap: Record<number, Estado> = {};
    materias.forEach(mat => { estadoMap[mat.id] = mat.estado; });

    const cursarOk = m.correlativasCursar.every(id =>
      ['CURSANDO','REGULAR','APROBADA'].includes(estadoMap[id] ?? 'PENDIENTE')
    );
    const aprobarOk = m.correlativasAprobar.every(id =>
      estadoMap[id] === 'APROBADA'
    );

    return cursarOk && aprobarOk ? 'DISPONIBLE' : 'PENDIENTE';
  }, [materias]);

  /**
   * Llama a la API para actualizar el estado y aplica el cambio localmente
   * (optimistic update) sin necesidad de re-fetch completo.
   */
  const updateEstado = useCallback(async (id: number, payload: UpdateEstadoPayload) => {
    const updated = await api.updateEstado(id, payload);
    setMaterias(prev => prev.map(m => m.id === id ? updated : m));
    return updated;
  }, []);

  return { materias, loading, error, getEstadoVisual, updateEstado, refetch: fetchMaterias };
}
