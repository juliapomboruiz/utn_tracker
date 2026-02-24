package com.tuusuario.utntracker.controller;

import com.tuusuario.utntracker.dto.ProgresoDTO;
import com.tuusuario.utntracker.service.ProgresoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/progreso")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ProgresoController {

    private final ProgresoService progresoService;

    /**
     * GET /api/progreso
     * Retorna el resumen estadístico de la carrera.
     */
    @GetMapping
    public ResponseEntity<ProgresoDTO> getProgreso() {
        return ResponseEntity.ok(progresoService.getProgreso());
    }
}
