package com.tuusuario.utntracker.service;

import com.tuusuario.utntracker.domain.enums.Estado;
import com.tuusuario.utntracker.dto.ProgresoDTO;
import com.tuusuario.utntracker.repository.MateriaEstadoRepository;
import com.tuusuario.utntracker.repository.MateriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
@RequiredArgsConstructor
public class ProgresoService {

    private final MateriaRepository       materiaRepository;
    private final MateriaEstadoRepository estadoRepository;

    @Transactional(readOnly = true)
    public ProgresoDTO getProgreso() {
        int total      = (int) materiaRepository.count();
        int aprobadas  = (int) estadoRepository.countByEstado(Estado.APROBADA);
        int cursando   = (int) estadoRepository.countByEstado(Estado.CURSANDO);
        int regular    = (int) estadoRepository.countByEstado(Estado.REGULAR);
        int enCurso    = cursando + regular;
        int pendientes = total - aprobadas - enCurso;
        int porcentaje = total > 0 ? (int) Math.round(aprobadas * 100.0 / total) : 0;

        // Promedio de materias aprobadas con nota cargada
        BigDecimal promedio = estadoRepository.findByEstado(Estado.APROBADA)
            .stream()
            .filter(e -> e.getNota() != null)
            .map(e -> e.getNota())
            .reduce(BigDecimal.ZERO, BigDecimal::add)
            .divide(
                BigDecimal.valueOf(
                    Math.max(1, estadoRepository.findByEstado(Estado.APROBADA)
                        .stream().filter(e -> e.getNota() != null).count())
                ),
                2, RoundingMode.HALF_UP
            );

        int creditosElectivas = estadoRepository.findByEstado(Estado.APROBADA)
            .stream()
            .filter(e -> e.getMateria().getEsElectiva())
            .mapToInt(e -> e.getMateria().getCreditos())
            .sum();

        return ProgresoDTO.builder()
            .totalMaterias(total)
            .aprobadas(aprobadas)
            .enCurso(enCurso)
            .pendientes(pendientes)
            .porcentaje(porcentaje)
            .promedio(promedio.compareTo(BigDecimal.ZERO) == 0 ? null : promedio)
            .build();
    }
}
