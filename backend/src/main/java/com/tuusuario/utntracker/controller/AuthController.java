package com.tuusuario.utntracker.controller;

import com.tuusuario.utntracker.config.JwtService;
import com.tuusuario.utntracker.domain.Usuario;
import com.tuusuario.utntracker.repository.MateriaEstadoRepository;
import com.tuusuario.utntracker.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final MateriaEstadoRepository materiaEstadoRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    @Transactional
    public ResponseEntity<?> register(@RequestBody Usuario request) {
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("El email ya está registrado");
        }
        
        // 1. Crear el Usuario
        Usuario user = new Usuario();
        user.setNombre(request.getNombre());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRol("USER");
        
        Usuario guardado = usuarioRepository.save(user);
        
        // 2. Inicializarle todas las materias en PENDIENTE (una sola consulta)
        // Así cuando entre, ya tiene su grilla lista para usar.
        materiaEstadoRepository.inicializarEstados(guardado.getId());

        // 3. Generar Token y devolverlo
        String token = jwtService.generateToken(new UserDetailsImpl(guardado));
        return ResponseEntity.ok(Map.of("token", token, "nombre", guardado.getNombre()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.get("email"), request.get("password"))
        );

        Usuario user = usuarioRepository.findByEmail(request.get("email")).orElseThrow();
        String token = jwtService.generateToken(new UserDetailsImpl(user));
        
        return ResponseEntity.ok(Map.of("token", token, "nombre", user.getNombre()));
    }
}
