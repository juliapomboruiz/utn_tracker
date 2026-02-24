package com.tuusuario.utntracker.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter @Builder
public class ProgresoDTO {
    private final int        totalMaterias;
    private final int        aprobadas;
    private final int        enCurso;       // CURSANDO + REGULAR
    private final int        pendientes;
    private final int        porcentaje;    // aprobadas / total * 100
    private final BigDecimal promedio;      // promedio de notas aprobadas
}
