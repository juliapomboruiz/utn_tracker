package com.tuusuario.utntracker.domain;

import com.tuusuario.utntracker.domain.enums.Estado;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "materia_estado")
@Getter @Setter @NoArgsConstructor
public class MateriaEstado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "materia_id", nullable = false, unique = true)
    private Materia materia;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Estado estado = Estado.PENDIENTE;

    /**
     * Null si la materia no está aprobada o regular todavía.
     */
    @Column(precision = 4, scale = 2)
    private BigDecimal nota;

    @Column(name = "anio_academico", columnDefinition = "YEAR")
    private Integer anioAcademico;

    @Column(name = "cuatrimestre_cursado", columnDefinition = "TINYINT")
    private Integer cuatrimestreCursado;
}
