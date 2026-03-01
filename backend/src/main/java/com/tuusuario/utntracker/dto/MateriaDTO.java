package com.tuusuario.utntracker.dto;

import com.tuusuario.utntracker.domain.Materia;
import com.tuusuario.utntracker.domain.enums.Estado;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO completo de una materia, incluyendo su estado actual y correlativas.
 * Se construye desde la entidad con el factory method {@code from()}.
 */
@Getter
public class MateriaDTO {

    private final Integer id;
    private final String  nombre;
    private final Integer anio;
    private final Integer cuatrimestre;     // 0=Anual, 1=1°C, 2=2°C
    private final Boolean esLibre;
    private final Boolean esConfigurable;
    private final Boolean esElectiva;
    private final Integer creditos;

    // IDs de correlativas (el frontend ya conoce los datos completos)
    private final List<Integer> correlativasCursar;
    private final List<Integer> correlativasAprobar;

    // Estado actual del alumno
    private final Estado     estado;
    private final BigDecimal nota;
    private final Integer    anioAcademico;
    private final Integer    cuatrimestreCursado;

    private MateriaDTO(Materia m) {
        this.id              = m.getId();
        this.nombre          = m.getNombre();
        this.anio            = m.getAnio();
        this.cuatrimestre    = m.getCuatrimestre();
        this.esLibre         = m.getEsLibre();
        this.esConfigurable  = m.getEsConfigurable();
        this.esElectiva      = m.getEsElectiva();
        this.creditos        = m.getCreditos();

        this.correlativasCursar  = m.getCorrelativasCursar().stream()
                                    .map(Materia::getId).toList();
        this.correlativasAprobar = m.getCorrelativasAprobar().stream()
                                    .map(Materia::getId).toList();

        var est = m.getEstado();
        this.estado              = est != null ? est.getEstado()            : Estado.PENDIENTE;
        this.nota                = est != null ? est.getNota()              : null;
        this.anioAcademico       = est != null ? est.getAnioAcademico()     : null;
        this.cuatrimestreCursado = est != null ? est.getCuatrimestreCursado() : null;
    }

    public static MateriaDTO from(Materia m) {
        return new MateriaDTO(m);
    }
}
