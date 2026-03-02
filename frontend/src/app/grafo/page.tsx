'use client';

import { useState } from 'react';
import { useMaterias } from '@/hooks/useMaterias';
import StatsPanel from '@/components/StatsPanel/StatsPanel';
import GrafoCorrelativas from '@/components/GrafoCorrelativas/GrafoCorrelativas';
import EditarEstadoModal from '@/components/EditarEstadoModal/EditarEstadoModal';
import NavTabs from '@/components/NavTabs/NavTabs';
import { Materia } from '@/types';

export default function GrafoPage() {
  const { materias, loading, error, getEstadoVisual, updateEstado } = useMaterias();
  const [selected, setSelected] = useState<Materia | null>(null);

  if (loading) return <div style={{ padding: 40, color: '#4a5f75' }}>Cargando materias...</div>;
  if (error)   return <div style={{ padding: 40, color: '#f87171' }}>Error: {error}</div>;

  return (
    <>
      <StatsPanel materias={materias} />
      <NavTabs active="grafo" />

      <div style={{ maxWidth: '100%', margin: '0 auto', padding: '0 24px 48px' }}>
        <GrafoCorrelativas
          materias={materias}
          getEstadoVisual={getEstadoVisual}
          onClickMateria={setSelected}
        />
      </div>

      {selected && (
        <EditarEstadoModal
          materia={selected}
          materias={materias}
          onSave={async (payload) => {
            await updateEstado(selected.id, payload);
            setSelected(null);
          }}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
