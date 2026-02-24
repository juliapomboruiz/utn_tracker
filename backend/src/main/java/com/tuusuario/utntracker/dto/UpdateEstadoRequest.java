package com.tuusuario.utntracker.dto;

import com.tuusuario.utntracker.domain.enums.Estado;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter
public class UpdateEstadoRequest {

    @NotNull(message = "El estado es obligatorio")
    private Estado estado;

    @DecimalMin(value = "1.00", message = "La nota mínima es 1")
    @DecimalMax(value = "10.00", message = "La nota máxima es 10")
    private BigDecimal nota;

    private Integer anioAcademico;
    private Integer cuatrimestreCursado;
}
