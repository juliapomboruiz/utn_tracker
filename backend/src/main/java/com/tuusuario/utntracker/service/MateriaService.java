package com.tuusuario.utntracker.service;

import com.tuusuario.utntracker.domain.Materia;
import com.tuusuario.utntracker.domain.MateriaEstado;
import com.tuusuario.utntracker.dto.MateriaDTO;
import com.tuusuario.utntracker.dto.UpdateEstadoRequest;
import com.tuusuario.utntracker.repository.MateriaEstadoRepository;
import com.tuusuario.utntracker.repository.MateriaRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MateriaService {

    private final MateriaRepository       materiaRepository;
    private final MateriaEstadoRepository estadoRepository;

    /**
     * Retorna todas las materias con sus correlativas y estado.
     */
    @Transactional(readOnly = true)
    public List<MateriaDTO> getAll() {
        return materiaRepository.findAllWithCorrelativas()
                                .stream()
                                .map(MateriaDTO::from)
                                .toList();
    }

    /**
     * Actualiza el estado y la nota de una materia.
     */
    @Transactional
    public MateriaDTO updateEstado(Integer materiaId, UpdateEstadoRequest request) {
        Materia materia = materiaRepository.findById(materiaId)
            .orElseThrow(() -> new EntityNotFoundException(
                "Materia con id %d no encontrada".formatted(materiaId)
            ));

        MateriaEstado estado = estadoRepository.findByMateriaId(materiaId)
            .orElseGet(() -> {
                var nuevo = new MateriaEstado();
                nuevo.setMateria(materia);
                return nuevo;
            });

        estado.setEstado(request.getEstado());

        // La nota solo tiene sentido en REGULAR o APROBADA
        switch (request.getEstado()) {
            case REGULAR, APROBADA -> estado.setNota(request.getNota());
            default                -> estado.setNota(null);
        }

        estado.setAnioAcademico(request.getAnioAcademico());
        estado.setCuatrimestreCursado(request.getCuatrimestreCursado());

        estadoRepository.save(estado);

        // Recargar la materia para que el DTO refleje el estado actualizado
        return MateriaDTO.from(materiaRepository.findById(materiaId).get());
    }
}
