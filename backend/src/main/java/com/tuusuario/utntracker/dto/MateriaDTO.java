package com.tuusuario.utntracker.dto;

import com.tuusuario.utntracker.domain.Materia;
import com.tuusuario.utntracker.domain.MateriaEstado;
import com.tuusuario.utntracker.domain.enums.Estado;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO completo de una materia, incluyendo su estado actual y correlativas.
 *
 * FIX: Se agregó el factory method from(Materia, MateriaEstado) para construir
 * el DTO con el estado correcto del usuario autenticado, desacoplado del mapping
 * @OneToOne de Materia.estado (que en un sistema multi-usuario es ambiguo).
 */
@Getter
public class MateriaDTO {

    private final Integer id;
    private final String  nombre;
    private final Integer anio;
    private final Integer cuatrimestre;
    private final Boolean esLibre;
    private final Boolean esConfigurable;
    private final Boolean esElectiva;
    private final Integer creditos;

    private final List<Integer> correlativasCursar;
    private final List<Integer> correlativasAprobar;

    // Estado del alumno autenticado
    private final Estado     estado;
    private final BigDecimal nota;
    private final Integer    anioAcademico;
    private final Integer    cuatrimestreCursado;

    private MateriaDTO(Materia m, MateriaEstado est) {
        this.id             = m.getId();
        this.nombre         = m.getNombre();
        this.anio           = m.getAnio();
        this.cuatrimestre   = m.getCuatrimestre();
        this.esLibre        = m.getEsLibre();
        this.esConfigurable = m.getEsConfigurable();
        this.esElectiva     = m.getEsElectiva();
        this.creditos       = m.getCreditos();

        this.correlativasCursar  = m.getCorrelativasCursar().stream()
                                    .map(Materia::getId).toList();
        this.correlativasAprobar = m.getCorrelativasAprobar().stream()
                                    .map(Materia::getId).toList();

        // FIX: recibe el estado explícitamente, no via m.getEstado() que es ambiguo
        this.estado              = est != null ? est.getEstado()              : Estado.PENDIENTE;
        this.nota                = est != null ? est.getNota()                : null;
        this.anioAcademico       = est != null ? est.getAnioAcademico()       : null;
        this.cuatrimestreCursado = est != null ? est.getCuatrimestreCursado() : null;
    }

    /** Usa el MateriaEstado ya resuelto para el usuario correcto. */
    public static MateriaDTO from(Materia m, MateriaEstado est) {
        return new MateriaDTO(m, est);
    }

    /** Fallback para compatibilidad (ej: tests que no necesitan multi-usuario). */
    public static MateriaDTO from(Materia m) {
        return new MateriaDTO(m, m.getEstado());
    }
}