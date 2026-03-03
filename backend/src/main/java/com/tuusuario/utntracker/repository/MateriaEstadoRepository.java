package com.tuusuario.utntracker.repository;

import com.tuusuario.utntracker.domain.MateriaEstado;
import com.tuusuario.utntracker.domain.Usuario;
import com.tuusuario.utntracker.domain.enums.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MateriaEstadoRepository extends JpaRepository<MateriaEstado, Long> {

    // FIX: Integer es consistente con Materia.id (era Long antes → bug silencioso)
    Optional<MateriaEstado> findByUsuarioAndMateriaId(Usuario usuario, Integer materiaId);

    // FIX: agregado para cargar todos los estados de un usuario en getAll()
    List<MateriaEstado> findByUsuario(Usuario usuario);

    List<MateriaEstado> findByEstado(Estado estado);

    long countByEstado(Estado estado);
}