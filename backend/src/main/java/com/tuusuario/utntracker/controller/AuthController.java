package com.tuusuario.utntracker.controller;

import com.tuusuario.utntracker.config.JwtService;
import com.tuusuario.utntracker.domain.Materia;
import com.tuusuario.utntracker.domain.MateriaEstado;
import com.tuusuario.utntracker.domain.Usuario;
import com.tuusuario.utntracker.domain.enums.Estado;
import com.tuusuario.utntracker.repository.MateriaEstadoRepository;
import com.tuusuario.utntracker.repository.MateriaRepository;
import com.tuusuario.utntracker.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final MateriaRepository materiaRepository;             // <--- Nuevo
    private final MateriaEstadoRepository materiaEstadoRepository; // <--- Nuevo
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
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
        
        // 2. ¡MAGIA! Inicializarle todas las materias en PENDIENTE
        // Así cuando entre, ya tiene su grilla lista para usar.
        List<Materia> todasLasMaterias = materiaRepository.findAll();
        
        List<MateriaEstado> estadosIniciales = todasLasMaterias.stream().map(materia -> {
            MateriaEstado estado = new MateriaEstado();
            estado.setUsuario(guardado);
            estado.setMateria(materia);
            estado.setEstado(Estado.PENDIENTE);
            return estado;
        }).toList();

        materiaEstadoRepository.saveAll(estadosIniciales);
        
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

    // Endpoint para Login Social (Google)
    @PostMapping("/social-login")
    public ResponseEntity<?> socialLogin(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String nombre = request.get("nombre");

        // 1. Buscamos si ya existe el usuario
        Usuario user = usuarioRepository.findByEmail(email).orElse(null);

        if (user == null) {
            // 2. Si NO existe, lo creamos automáticamente (sin contraseña)
            user = new Usuario();
            user.setEmail(email);
            user.setNombre(nombre);
            user.setRol("USER");
            user.setPassword(passwordEncoder.encode("SOCIAL_LOGIN_" + Math.random())); // Clave aleatoria inaccesible
            
            Usuario guardado = usuarioRepository.save(user);

            // 3. Le creamos las materias iniciales
            List<Materia> todasLasMaterias = materiaRepository.findAll();
            Usuario finalUser = guardado; // variable final para el stream
            List<MateriaEstado> estadosIniciales = todasLasMaterias.stream().map(materia -> {
                MateriaEstado estado = new MateriaEstado();
                estado.setUsuario(finalUser);
                estado.setMateria(materia);
                estado.setEstado(Estado.PENDIENTE);
                return estado;
            }).toList();
            materiaEstadoRepository.saveAll(estadosIniciales);
        }

        // 4. Generamos el Token JWT de nuestra app
        String token = jwtService.generateToken(new UserDetailsImpl(user));
        return ResponseEntity.ok(Map.of("token", token, "nombre", user.getNombre()));
    }
}