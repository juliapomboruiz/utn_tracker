package com.tuusuario.utntracker.repository;

import com.tuusuario.utntracker.domain.MateriaEstado;
import com.tuusuario.utntracker.domain.enums.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MateriaEstadoRepository extends JpaRepository<MateriaEstado, Long> {

    Optional<MateriaEstado> findByMateriaId(Integer materiaId);

    List<MateriaEstado> findByEstado(Estado estado);

    long countByEstado(Estado estado);
}
