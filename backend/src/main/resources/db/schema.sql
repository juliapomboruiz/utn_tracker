CREATE DATABASE IF NOT EXISTS utn_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE utn_tracker;

-- Limpieza inicial (orden importante por las claves foráneas)
DROP TABLE IF EXISTS materia_estado;
DROP TABLE IF EXISTS correlatividad;
DROP TABLE IF EXISTS materia;
DROP TABLE IF EXISTS usuario;

-- 1. Tabla de USUARIOS
CREATE TABLE usuario (
    id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    email    VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Aquí guardaremos la contraseña encriptada
    nombre   VARCHAR(100) NOT NULL,
    rol      VARCHAR(20)  NOT NULL DEFAULT 'USER'
);

-- 2. Tabla de MATERIAS 
CREATE TABLE materia (
    id               INT PRIMARY KEY,
    nombre           VARCHAR(100) NOT NULL,
    anio             TINYINT     NOT NULL,
    cuatrimestre     TINYINT     NOT NULL,
    es_libre         BOOLEAN     NOT NULL DEFAULT FALSE,
    es_configurable  BOOLEAN     NOT NULL DEFAULT FALSE,
    es_electiva      BOOLEAN     NOT NULL DEFAULT FALSE,
    creditos         INT         NOT NULL DEFAULT 0
);

-- 3. Tabla de CORRELATIVIDADES 
CREATE TABLE correlatividad (
    materia_id      INT NOT NULL,
    correlativa_id  INT NOT NULL,
    tipo            ENUM('CURSAR', 'APROBAR') NOT NULL,
    PRIMARY KEY (materia_id, correlativa_id, tipo),
    FOREIGN KEY (materia_id)     REFERENCES materia(id),
    FOREIGN KEY (correlativa_id) REFERENCES materia(id)
);

-- 4. Tabla de ESTADOS
CREATE TABLE materia_estado (
    id                       BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id               BIGINT       NOT NULL, 
    materia_id               INT          NOT NULL,
    estado                   ENUM('PENDIENTE','CURSANDO','REGULAR','APROBADA') NOT NULL DEFAULT 'PENDIENTE',
    nota                     DECIMAL(4,2) NULL,
    anio_academico           YEAR         NULL,
    cuatrimestre_cursado     TINYINT      NULL,
    
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (materia_id) REFERENCES materia(id),

    UNIQUE (usuario_id, materia_id) 
);