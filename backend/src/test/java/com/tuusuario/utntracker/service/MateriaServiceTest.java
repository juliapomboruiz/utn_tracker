package com.tuusuario.utntracker.service;

import com.tuusuario.utntracker.domain.Materia;
import com.tuusuario.utntracker.domain.MateriaEstado;
import com.tuusuario.utntracker.domain.enums.Estado;
import com.tuusuario.utntracker.dto.UpdateEstadoRequest;
import com.tuusuario.utntracker.repository.MateriaEstadoRepository;
import com.tuusuario.utntracker.repository.MateriaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MateriaServiceTest {

    @Mock MateriaRepository       materiaRepository;
    @Mock MateriaEstadoRepository estadoRepository;

    @InjectMocks MateriaService service;

    private Materia materia;
    private MateriaEstado estadoEntity;

    @BeforeEach
    void setUp() {
        materia = new Materia();
        materia.setId(1);
        materia.setNombre("Análisis Matemático I");
        materia.setAnio(1);
        materia.setCuatrimestre(0);
        materia.setEsLibre(false);
        materia.setEsConfigurable(false);
        materia.setCorrelativasCursar(List.of());
        materia.setCorrelativasAprobar(List.of());

        estadoEntity = new MateriaEstado();
        estadoEntity.setMateria(materia);
        estadoEntity.setEstado(Estado.PENDIENTE);
        materia.setEstado(estadoEntity);
    }

    @Test
    @DisplayName("getAll retorna lista de DTOs mapeada correctamente")
    void getAll_retornaListaDTOs() {
        when(materiaRepository.findAllWithCorrelativas()).thenReturn(List.of(materia));

        var resultado = service.getAll();

        assertThat(resultado).hasSize(1);
        assertThat(resultado.get(0).getId()).isEqualTo(1);
        assertThat(resultado.get(0).getNombre()).isEqualTo("Análisis Matemático I");
        assertThat(resultado.get(0).getEstado()).isEqualTo(Estado.PENDIENTE);
    }

    @Test
    @DisplayName("updateEstado cambia el estado a APROBADA y guarda la nota")
    void updateEstado_aprobada_guardaNota() {
        var request = new UpdateEstadoRequest();
        request.setEstado(Estado.APROBADA);
        request.setNota(new BigDecimal("8.50"));

        when(materiaRepository.findById(1)).thenReturn(Optional.of(materia));
        when(estadoRepository.findByMateriaId(1)).thenReturn(Optional.of(estadoEntity));
        when(estadoRepository.save(any())).thenReturn(estadoEntity);

        service.updateEstado(1, request);

        assertThat(estadoEntity.getEstado()).isEqualTo(Estado.APROBADA);
        assertThat(estadoEntity.getNota()).isEqualByComparingTo("8.50");
        verify(estadoRepository, times(1)).save(estadoEntity);
    }

    @Test
    @DisplayName("updateEstado limpia la nota cuando el estado es CURSANDO")
    void updateEstado_cursando_limpaNota() {
        estadoEntity.setEstado(Estado.APROBADA);
        estadoEntity.setNota(new BigDecimal("9.00"));

        var request = new UpdateEstadoRequest();
        request.setEstado(Estado.CURSANDO);

        when(materiaRepository.findById(1)).thenReturn(Optional.of(materia));
        when(estadoRepository.findByMateriaId(1)).thenReturn(Optional.of(estadoEntity));
        when(estadoRepository.save(any())).thenReturn(estadoEntity);

        service.updateEstado(1, request);

        assertThat(estadoEntity.getNota()).isNull();
    }

    @Test
    @DisplayName("updateEstado lanza EntityNotFoundException si la materia no existe")
    void updateEstado_materiaInexistente_lanzaExcepcion() {
        when(materiaRepository.findById(999)).thenReturn(Optional.empty());

        var request = new UpdateEstadoRequest();
        request.setEstado(Estado.CURSANDO);

        assertThatThrownBy(() -> service.updateEstado(999, request))
            .isInstanceOf(EntityNotFoundException.class)
            .hasMessageContaining("999");
    }
}
