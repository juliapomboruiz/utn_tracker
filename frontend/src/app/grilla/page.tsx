'use client';

import { useState } from 'react';
import { useMaterias } from '@/hooks/useMaterias';
import StatsPanel from '@/components/StatsPanel/StatsPanel';
import GrillaCarrera from '@/components/GrillaCarrera/GrillaCarrera';
import EditarEstadoModal from '@/components/EditarEstadoModal/EditarEstadoModal';
import NavTabs from '@/components/NavTabs/NavTabs';
import { Materia } from '@/types';

export default function GrillaPage() {
  const { materias, loading, error, getEstadoVisual, updateEstado } = useMaterias();
  const [selected, setSelected] = useState<Materia | null>(null);

  if (loading) return <div style={{ padding: 40, color: '#4a5f75' }}>Cargando materias...</div>;
  if (error)   return <div style={{ padding: 40, color: '#f87171' }}>Error: {error}</div>;

  return (
    <>
      <StatsPanel materias={materias} />
      <NavTabs active="grilla" />

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 48px' }}>
        <GrillaCarrera
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
