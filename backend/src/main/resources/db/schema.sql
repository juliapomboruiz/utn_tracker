-- Active: 1772330341262@@127.0.0.1@3306@utn_tracker
CREATE DATABASE IF NOT EXISTS utn_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE utn_tracker;

-- Borramos las tablas si ya existen para crearlas limpias con la nueva estructura
DROP TABLE IF EXISTS materia_estado;
DROP TABLE IF EXISTS correlatividad;
DROP TABLE IF EXISTS materia;

CREATE TABLE materia (
    id               INT PRIMARY KEY,
    nombre           VARCHAR(100) NOT NULL,
    anio             TINYINT     NOT NULL COMMENT '1 al 5',
    cuatrimestre     TINYINT     NOT NULL COMMENT '0=Anual, 1=Primer, 2=Segundo',
    es_libre         BOOLEAN     NOT NULL DEFAULT FALSE COMMENT 'Se puede rendir libre',
    es_configurable  BOOLEAN     NOT NULL DEFAULT FALSE COMMENT 'El alumno elige en qué cuatrimestre la cursa',
    es_electiva      BOOLEAN     NOT NULL DEFAULT FALSE COMMENT 'Indica si es materia electiva',
    creditos         INT         NOT NULL DEFAULT 0 COMMENT 'Cantidad de créditos que aporta'
);

CREATE TABLE correlatividad (
    materia_id      INT NOT NULL,
    correlativa_id  INT NOT NULL,
    tipo            ENUM('CURSAR', 'APROBAR') NOT NULL,
    PRIMARY KEY (materia_id, correlativa_id, tipo),
    FOREIGN KEY (materia_id)     REFERENCES materia(id),
    FOREIGN KEY (correlativa_id) REFERENCES materia(id)
);

CREATE TABLE materia_estado (
    id                       BIGINT AUTO_INCREMENT PRIMARY KEY,
    materia_id               INT          NOT NULL UNIQUE,
    estado                   ENUM('PENDIENTE','CURSANDO','REGULAR','APROBADA') NOT NULL DEFAULT 'PENDIENTE',
    nota                     DECIMAL(4,2) NULL,
    anio_academico           YEAR         NULL,
    cuatrimestre_cursado     TINYINT      NULL,
    FOREIGN KEY (materia_id) REFERENCES materia(id)
);