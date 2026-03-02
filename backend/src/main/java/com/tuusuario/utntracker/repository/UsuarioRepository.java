package com.tuusuario.utntracker.repository;

import com.tuusuario.utntracker.domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Este método mágico permite a Spring buscar usuarios por su email automáticamente
    Optional<Usuario> findByEmail(String email);
}