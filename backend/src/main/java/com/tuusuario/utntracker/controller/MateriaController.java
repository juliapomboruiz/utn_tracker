package com.tuusuario.utntracker.controller;

import com.tuusuario.utntracker.dto.MateriaDTO;
import com.tuusuario.utntracker.dto.UpdateEstadoRequest;
import com.tuusuario.utntracker.service.MateriaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * FIX: Controller limpio siguiendo la regla Controller-Service-Repository.
 *
 * - Eliminadas inyecciones directas de UsuarioRepository y MateriaEstadoRepository
 *   (la lógica de negocio pertenece al Service, no al Controller).
 * - El PUT usa UpdateEstadoRequest (BigDecimal nota) en lugar de MateriaEstadoDTO (Integer nota).
 * - El PUT devuelve MateriaDTO en lugar de la entidad MateriaEstado cruda.
 * - @PathVariable corregido a Integer (consistente con Materia.id).
 */
@RestController
@RequestMapping("/api/materias")
@RequiredArgsConstructor
public class MateriaController {

    private final MateriaService materiaService;

    @GetMapping
    public ResponseEntity<List<MateriaDTO>> getAll() {
        String email = getEmailAutenticado();
        return ResponseEntity.ok(materiaService.getAll(email));
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<MateriaDTO> actualizarEstado(
            @PathVariable Integer id,           // FIX: Integer, no Long
            @RequestBody @Valid UpdateEstadoRequest dto   // FIX: UpdateEstadoRequest, no MateriaEstadoDTO
    ) {
        String email = getEmailAutenticado();
        MateriaDTO updated = materiaService.updateEstado(id, email, dto);
        return ResponseEntity.ok(updated);      // FIX: devuelve MateriaDTO, no la entidad
    }

    // ── helper ───────────────────────────────────────────────────────────────

    private String getEmailAutenticado() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}