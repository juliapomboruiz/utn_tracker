package com.tuusuario.utntracker.repository;

import com.tuusuario.utntracker.domain.MateriaEstado;
import com.tuusuario.utntracker.domain.Usuario;
import com.tuusuario.utntracker.domain.enums.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    /**
     * Crea en una sola consulta un estado PENDIENTE por cada materia del plan para el usuario.
     * Reemplaza al saveAll() de ~50 inserts individuales, que hacía muy lento el registro.
     */
    @Modifying
    @Query(value = """
            INSERT INTO materia_estado (usuario_id, materia_id, estado)
            SELECT :usuarioId, m.id, 'PENDIENTE' FROM materia m
            """, nativeQuery = true)
    int inicializarEstados(@Param("usuarioId") Long usuarioId);
}