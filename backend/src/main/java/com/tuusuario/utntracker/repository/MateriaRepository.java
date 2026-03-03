package com.tuusuario.utntracker.repository;

import com.tuusuario.utntracker.domain.Materia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MateriaRepository extends JpaRepository<Materia, Integer> {

    List<Materia> findByAnioOrderByIdAsc(Integer anio);

    List<Materia> findByAnioAndCuatrimestreOrderByIdAsc(Integer anio, Integer cuatrimestre);

    /**
     * Trae todas las materias con sus correlativas en un solo query.
     * FIX: Se eliminó LEFT JOIN FETCH m.estado porque Materia.estado es @OneToOne
     * pero en BD hay múltiples registros por materia (uno por usuario).
     * El estado del usuario se carga por separado en MateriaService.getAll().
     */
    @Query("""
        SELECT DISTINCT m FROM Materia m
        LEFT JOIN FETCH m.correlativasCursar
        LEFT JOIN FETCH m.correlativasAprobar
        ORDER BY m.anio ASC, m.cuatrimestre ASC, m.id ASC
    """)
    List<Materia> findAllWithCorrelativas();
}