package com.tuusuario.utntracker.dto;

import com.tuusuario.utntracker.domain.enums.Estado;
import lombok.Data;

@Data
public class MateriaEstadoDTO {
    private Estado estado;
    private Integer nota;
    private Integer anioAcademico;
    private Integer cuatrimestreCursado;
}