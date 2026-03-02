package com.tuusuario.utntracker.controller;

import com.tuusuario.utntracker.domain.MateriaEstado;
import com.tuusuario.utntracker.domain.Usuario;
import com.tuusuario.utntracker.dto.MateriaDTO;
import com.tuusuario.utntracker.dto.MateriaEstadoDTO;
import com.tuusuario.utntracker.dto.UpdateEstadoRequest;
import com.tuusuario.utntracker.service.MateriaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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
     * Actualiza el estado de una materia para el usuario autenticado.
     * Recibe un objeto JSON con el nuevo estado y opcionalmente nota, año académico y cuatrimestre cursado.
     * Ejemplo de JSON:
     * {
     *  "estado": "CURSANDO",
     * "nota": 8,
     * "anioAcademico": 2024,
     * "cuatrimestreCursado": 1
     * }
     */
   @PutMapping("/{id}/estado")
    public ResponseEntity<?> actualizarEstado(
            @PathVariable Long id, 
            @RequestBody MateriaEstadoDTO dto // <--- ¡Aquí está el cambio clave!
    ) {
        // Buscamos la relación usuario-materia
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow();
        
        MateriaEstado materiaEstado = materiaEstadoRepository.findByUsuarioAndMateriaId(usuario, id)
                .orElseThrow(() -> new RuntimeException("Materia no encontrada para este usuario"));

        // Actualizamos TODOS los campos que vengan
        if (dto.getEstado() != null) materiaEstado.setEstado(dto.getEstado());
        
        // Solo actualizamos nota/año si vienen en el paquete (no son null)
        if (dto.getNota() != null) materiaEstado.setNota(dto.getNota());
        if (dto.getAnioAcademico() != null) materiaEstado.setAnioCursada(dto.getAnioAcademico());
        if (dto.getCuatrimestreCursado() != null) materiaEstado.setCuatrimestre(dto.getCuatrimestreCursado());

        materiaEstadoRepository.save(materiaEstado);
        
        return ResponseEntity.ok(materiaEstado);
    }
}
