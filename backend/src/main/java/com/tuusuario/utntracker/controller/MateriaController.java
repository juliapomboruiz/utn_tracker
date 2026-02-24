package com.tuusuario.utntracker.controller;

import com.tuusuario.utntracker.dto.MateriaDTO;
import com.tuusuario.utntracker.dto.UpdateEstadoRequest;
import com.tuusuario.utntracker.service.MateriaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materias")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class MateriaController {

    private final MateriaService materiaService;

    /**
     * GET /api/materias
     * Retorna todas las materias con correlativas y estado actual.
     */
    @GetMapping
    public ResponseEntity<List<MateriaDTO>> getAll() {
        return ResponseEntity.ok(materiaService.getAll());
    }

    /**
     * PUT /api/materias/{id}/estado
     * Actualiza el estado (y nota) de una materia.
     *
     * Body ejemplo:
     * {
     *   "estado": "APROBADA",
     *   "nota": 8.50,
     *   "anioAcademico": 2024,
     *   "cuatrimestreCursado": 1
     * }
     */
    @PutMapping("/{id}/estado")
    public ResponseEntity<MateriaDTO> updateEstado(
            @PathVariable Integer id,
            @Valid @RequestBody UpdateEstadoRequest request) {

        return ResponseEntity.ok(materiaService.updateEstado(id, request));
    }
}
