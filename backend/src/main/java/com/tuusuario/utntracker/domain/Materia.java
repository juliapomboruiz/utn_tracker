package com.tuusuario.utntracker.domain;

import com.tuusuario.utntracker.domain.enums.TipoCorrelatividad;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "materia")
@Getter @Setter @NoArgsConstructor
public class Materia {

    @Id
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false)
    private Integer anio;

    /**
     * 0 = Anual, 1 = Primer cuatrimestre, 2 = Segundo cuatrimestre
     */
    @Column(nullable = false)
    private Integer cuatrimestre;

    @Column(name = "es_libre", nullable = false)
    private Boolean esLibre = false;

    @Column(name = "es_configurable", nullable = false)
    private Boolean esConfigurable = false;

    // ── Correlatividades para CURSAR ───────────────────────────────────────────
    @ManyToMany
    @JoinTable(
        name = "correlatividad",
        joinColumns = @JoinColumn(name = "materia_id"),
        inverseJoinColumns = @JoinColumn(name = "correlativa_id"),
        foreignKey = @ForeignKey(name = "fk_corr_materia"),
        inverseForeignKey = @ForeignKey(name = "fk_corr_correlativa")
    )
    @Where(clause = "tipo = 'CURSAR'")   // filtra solo las de tipo CURSAR
    private List<Materia> correlativasCursar = new ArrayList<>();

    // ── Correlatividades para APROBAR ──────────────────────────────────────────
    @ManyToMany
    @JoinTable(
        name = "correlatividad",
        joinColumns = @JoinColumn(name = "materia_id"),
        inverseJoinColumns = @JoinColumn(name = "correlativa_id"),
        foreignKey = @ForeignKey(name = "fk_corr_materia"),
        inverseForeignKey = @ForeignKey(name = "fk_corr_correlativa")
    )
    @Where(clause = "tipo = 'APROBAR'")
    private List<Materia> correlativasAprobar = new ArrayList<>();

    // ── Estado del alumno (relación inversa) ───────────────────────────────────
    @OneToOne(mappedBy = "materia", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private MateriaEstado estado;
}
