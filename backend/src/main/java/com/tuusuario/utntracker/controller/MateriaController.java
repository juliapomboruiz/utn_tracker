package com.tuusuario.utntracker.controller;

import com.tuusuario.utntracker.domain.MateriaEstado;
import com.tuusuario.utntracker.domain.Usuario;
import com.tuusuario.utntracker.dto.MateriaDTO;
import com.tuusuario.utntracker.dto.MateriaEstadoDTO;
import com.tuusuario.utntracker.repository.MateriaEstadoRepository;
import com.tuusuario.utntracker.repository.UsuarioRepository;
import com.tuusuario.utntracker.service.MateriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal; // <--- Importante para la nota
import java.util.List;

@RestController
@RequestMapping("/api/materias")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class MateriaController {

    private final MateriaService materiaService;
    private final UsuarioRepository usuarioRepository;
    private final MateriaEstadoRepository materiaEstadoRepository;

    @GetMapping
    public ResponseEntity<List<MateriaDTO>> getAll() {
        return ResponseEntity.ok(materiaService.getAll());
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<?> actualizarEstado(
            @PathVariable Long id, 
            @RequestBody MateriaEstadoDTO dto
    ) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        MateriaEstado materiaEstado = materiaEstadoRepository.findByUsuarioAndMateriaId(usuario, id)
                .orElseThrow(() -> new RuntimeException("Materia no encontrada"));

        // 1. Actualizar Estado
        if (dto.getEstado() != null) {
            materiaEstado.setEstado(dto.getEstado());
        }
        
        // 2. Actualizar Nota (Convirtiendo de Integer a BigDecimal)
        if (dto.getNota() != null) {
            materiaEstado.setNota(BigDecimal.valueOf(dto.getNota()));
        }
        
        // 3. Actualizar Año (Usando el nombre correcto de la Entidad)
        if (dto.getAnioAcademico() != null) {
            materiaEstado.setAnioAcademico(dto.getAnioAcademico());
        }
        
        // 4. Actualizar Cuatrimestre (Usando el nombre correcto de la Entidad)
        if (dto.getCuatrimestreCursado() != null) {
            materiaEstado.setCuatrimestreCursado(dto.getCuatrimestreCursado());
        }

        materiaEstadoRepository.save(materiaEstado);
        
        return ResponseEntity.ok(materiaEstado);
    }
}