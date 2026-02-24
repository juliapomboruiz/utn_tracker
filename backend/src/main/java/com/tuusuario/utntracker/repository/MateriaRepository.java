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
     * Trae todas las materias con sus correlativas y estado en un solo query
     * para evitar el problema N+1.
     */
    @Query("""
        SELECT DISTINCT m FROM Materia m
        LEFT JOIN FETCH m.correlativasCursar
        LEFT JOIN FETCH m.correlativasAprobar
        LEFT JOIN FETCH m.estado
        ORDER BY m.anio ASC, m.cuatrimestre ASC, m.id ASC
    """)
    List<Materia> findAllWithCorrelativas();
}
