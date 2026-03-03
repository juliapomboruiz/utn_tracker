package com.tuusuario.utntracker.service;

import com.tuusuario.utntracker.domain.Materia;
import com.tuusuario.utntracker.domain.MateriaEstado;
import com.tuusuario.utntracker.domain.Usuario;
import com.tuusuario.utntracker.dto.MateriaDTO;
import com.tuusuario.utntracker.dto.UpdateEstadoRequest;
import com.tuusuario.utntracker.repository.MateriaEstadoRepository;
import com.tuusuario.utntracker.repository.MateriaRepository;
import com.tuusuario.utntracker.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MateriaService {

    private final MateriaRepository       materiaRepository;
    private final MateriaEstadoRepository estadoRepository;
    private final UsuarioRepository       usuarioRepository; // FIX: inyectado aquí, no en el Controller

    /**
     * Retorna todas las materias con el estado del usuario autenticado.
     *
     * FIX #1: recibe el email del usuario para filtrar estados correctamente.
     * FIX #4: carga los estados por separado (findByUsuario) y los inyecta en el DTO,
     *         evitando el problema del @OneToOne ambiguo en sistema multi-usuario.
     */
    @Transactional(readOnly = true)
    public List<MateriaDTO> getAll(String email) {
        Usuario usuario = resolverUsuario(email);

        List<Materia> materias = materiaRepository.findAllWithCorrelativas();

        // Un Map<materiaId, MateriaEstado> para O(1) lookup
        Map<Integer, MateriaEstado> estadoMap = estadoRepository.findByUsuario(usuario)
                .stream()
                .collect(Collectors.toMap(
                        me -> me.getMateria().getId(),
                        me -> me
                ));

        return materias.stream()
                .map(m -> MateriaDTO.from(m, estadoMap.get(m.getId())))
                .toList();
    }

    /**
     * Actualiza el estado de una materia para el usuario autenticado.
     *
     * FIX #2: delega la lógica completa que antes estaba mal puesta en el Controller.
     * FIX #3: filtra el MateriaEstado por usuario, no busca el primero que encuentre.
     * FIX #5: usa UpdateEstadoRequest (BigDecimal nota), elimina MateriaEstadoDTO.
     * FIX #6: limpia nota en estados que no la requieren.
     * FIX (respuesta): devuelve MateriaDTO, no la entidad cruda.
     */
    @Transactional
    public MateriaDTO updateEstado(Integer materiaId, String email, UpdateEstadoRequest request) {
        Usuario usuario = resolverUsuario(email);

        Materia materia = materiaRepository.findById(materiaId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Materia con id %d no encontrada".formatted(materiaId)
                ));

        MateriaEstado estado = estadoRepository.findByUsuarioAndMateriaId(usuario, materiaId)
                .orElseGet(() -> {
                    // Caso edge: el registro no existe (no debería pasar si el register funciona bien)
                    var nuevo = new MateriaEstado();
                    nuevo.setMateria(materia);
                    nuevo.setUsuario(usuario);
                    return nuevo;
                });

        estado.setEstado(request.getEstado());

        // FIX #6: limpiar nota explícitamente cuando no aplica
        switch (request.getEstado()) {
            case REGULAR, APROBADA -> estado.setNota(request.getNota());
            default                -> estado.setNota(null);
        }

        estado.setAnioAcademico(request.getAnioAcademico());
        estado.setCuatrimestreCursado(request.getCuatrimestreCursado());

        estadoRepository.save(estado);

        // FIX (respuesta): devolver MateriaDTO completo, no la entidad
        return MateriaDTO.from(materia, estado);
    }

    // ── helpers ──────────────────────────────────────────────────────────────

    private Usuario resolverUsuario(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Usuario con email %s no encontrado".formatted(email)
                ));
    }
}