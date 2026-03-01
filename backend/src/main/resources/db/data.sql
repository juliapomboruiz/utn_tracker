USE utn_tracker;

-- Limpiamos las tablas por las dudas para empezar de cero sin errores
DELETE FROM materia_estado;
DELETE FROM correlatividad;
DELETE FROM materia;

-- AÑO 1
INSERT INTO materia (id, nombre, anio, cuatrimestre, es_libre, es_configurable, es_electiva, creditos) VALUES
(1, 'Análisis Matemático I', 1, 0, FALSE, FALSE, FALSE, 0),
(2, 'Álgebra y Geometría Analítica', 1, 0, FALSE, FALSE, FALSE, 0),
(3, 'Física I', 1, 0, FALSE, FALSE, FALSE, 0),
(6, 'Algoritmos y Estr. de Datos', 1, 0, FALSE, FALSE, FALSE, 0),
(7, 'Arquitectura de Computadoras', 1, 0, FALSE, FALSE, FALSE, 0),
(5, 'Lógica y Estructuras Discretas', 1, 1, FALSE, FALSE, FALSE, 0),
(8, 'Sistemas y Proc. de Negocio', 1, 2, FALSE, FALSE, FALSE, 0);

-- AÑO 2
INSERT INTO materia (id, nombre, anio, cuatrimestre, es_libre, es_configurable, es_electiva, creditos) VALUES
(4, 'Inglés I', 2, 0, TRUE, FALSE, FALSE, 0),
(9, 'Análisis Matemático II', 2, 0, FALSE, FALSE, FALSE, 0),
(10, 'Física II', 2, 0, FALSE, FALSE, FALSE, 0),
(16, 'Análisis de Sistemas de Inf.', 2, 0, FALSE, FALSE, FALSE, 0),
(13, 'Sintaxis y Semántica', 2, 1, FALSE, FALSE, FALSE, 0),
(11, 'Ingeniería y Sociedad', 2, 2, FALSE, TRUE, FALSE, 0),
(14, 'Paradigmas de Programación', 2, 2, FALSE, FALSE, FALSE, 0),
(15, 'Sistemas Operativos', 2, 2, FALSE, FALSE, FALSE, 0);

-- AÑO 3
INSERT INTO materia (id, nombre, anio, cuatrimestre, es_libre, es_configurable, es_electiva, creditos) VALUES
(12, 'Inglés II', 3, 0, TRUE, FALSE, FALSE, 0),
(22, 'Análisis Numérico', 3, 0, FALSE, FALSE, FALSE, 0),
(23, 'Diseño de Sistemas de Inf.', 3, 0, FALSE, FALSE, FALSE, 0),
(18, 'Economía', 3, 1, FALSE, FALSE, FALSE, 0),
(19, 'Bases de Datos', 3, 1, FALSE, FALSE, FALSE, 0),
(21, 'Comunicación de Datos', 3, 1, FALSE, FALSE, FALSE, 0),
(17, 'Probabilidad y Estadísticas', 3, 2, FALSE, FALSE, FALSE, 0),
(20, 'Desarrollo de Software', 3, 2, FALSE, FALSE, FALSE, 0);

-- AÑO 4
INSERT INTO materia (id, nombre, anio, cuatrimestre, es_libre, es_configurable, es_electiva, creditos) VALUES
(30, 'Adm. de Sistemas de Inf.', 4, 0, FALSE, FALSE, FALSE, 0),
(24, 'Legislación', 4, 1, FALSE, FALSE, FALSE, 0),
(26, 'Redes de Datos', 4, 1, FALSE, FALSE, FALSE, 0),
(27, 'Investigación Operativa', 4, 1, FALSE, FALSE, FALSE, 0),
(25, 'Ing. y Calidad de Software', 4, 2, FALSE, FALSE, FALSE, 0),
(28, 'Simulación', 4, 2, FALSE, FALSE, FALSE, 0),
(29, 'Tecnologías para Autom.', 4, 1, FALSE, TRUE, FALSE, 0);

-- AÑO 5
INSERT INTO materia (id, nombre, anio, cuatrimestre, es_libre, es_configurable, es_electiva, creditos) VALUES
(36, 'Proyecto Final', 5, 0, FALSE, FALSE, FALSE, 0),
(31, 'Inteligencia Artificial', 5, 1, FALSE, FALSE, FALSE, 0),
(32, 'Ciencia de Datos', 5, 1, FALSE, FALSE, FALSE, 0),
(33, 'Sistemas de Gestión', 5, 1, FALSE, FALSE, FALSE, 0),
(34, 'Gestión Gerencial', 5, 2, FALSE, FALSE, FALSE, 0),
(35, 'Seguridad en los Sist. de Inf.', 5, 2, FALSE, FALSE, FALSE, 0);

-- ELECTIVAS
INSERT INTO materia (id, nombre, anio, cuatrimestre, es_libre, es_configurable, es_electiva, creditos) VALUES
(101, 'Química', 2, 1, FALSE, FALSE, TRUE, 6),
(102, 'Programación Competitiva I', 2, 1, FALSE, FALSE, TRUE, 4),
(103, 'Programación Competitiva II', 2, 2, FALSE, FALSE, TRUE, 4),
(104, 'Adm. de Procesos de TI', 3, 1, FALSE, FALSE, TRUE, 6),
(105, 'Administración y Finanzas', 3, 2, FALSE, FALSE, TRUE, 6),
(106, 'Bases de Datos NoSQL', 3, 2, FALSE, FALSE, TRUE, 6),
(107, 'Nuevos Paradigmas de Gestión y TI', 3, 2, FALSE, FALSE, TRUE, 4),
(108, 'Sistemas de Representación', 3, 2, FALSE, FALSE, TRUE, 6),
(109, 'Innovación y Emprendedorismo', 4, 2, FALSE, FALSE, TRUE, 6),
(110, 'Desarrollo de Aplicaciones Móviles', 4, 2, FALSE, FALSE, TRUE, 6),
(111, 'Dinámica de Sistemas', 4, 1, FALSE, FALSE, TRUE, 6),
(112, 'Estadística Aplicada', 4, 1, FALSE, FALSE, TRUE, 4),
(113, 'Ética Profesional', 4, 0, FALSE, FALSE, TRUE, 4),
(114, 'Métodos Ágiles para Des. de Software', 4, 1, FALSE, FALSE, TRUE, 4),
(115, 'Programación Concurrente', 4, 2, FALSE, FALSE, TRUE, 6),
(116, 'Taller de Redes', 4, 2, FALSE, FALSE, TRUE, 4),
(117, 'Auditoría Informática', 5, 2, FALSE, FALSE, TRUE, 6),
(118, 'Desarrollo de Aplicaciones en la Nube', 5, 1, FALSE, FALSE, TRUE, 6),
(119, 'Diseño de Software Basado en Arq.', 5, 1, FALSE, FALSE, TRUE, 6),
(120, 'Inteligencia Computacional', 5, 2, FALSE, FALSE, TRUE, 6),
(121, 'Inteligencia de Negocio', 5, 2, FALSE, FALSE, TRUE, 6),
(122, 'Virtualización y Sist. Operativos Avz.', 5, 1, FALSE, FALSE, TRUE, 6);

-- CORRELATIVIDADES (CURSAR)
INSERT INTO correlatividad (materia_id, correlativa_id, tipo) VALUES
(9, 1, 'CURSAR'), (9, 2, 'CURSAR'),
(10, 1, 'CURSAR'), (10, 3, 'CURSAR'),
(16, 6, 'CURSAR'), (16, 8, 'CURSAR'),
(13, 5, 'CURSAR'), (13, 6, 'CURSAR'),
(14, 5, 'CURSAR'), (14, 6, 'CURSAR'),
(15, 7, 'CURSAR'),
(19, 13, 'CURSAR'), (19, 16, 'CURSAR'),
(17, 1, 'CURSAR'), (17, 2, 'CURSAR'),
(20, 14, 'CURSAR'), (20, 16, 'CURSAR'),
(22, 9, 'CURSAR'),
(23, 14, 'CURSAR'), (23, 16, 'CURSAR'),
(30, 18, 'CURSAR'), (30, 23, 'CURSAR'),
(24, 11, 'CURSAR'),
(26, 15, 'CURSAR'), (26, 21, 'CURSAR'),
(27, 17, 'CURSAR'), (27, 22, 'CURSAR'),
(25, 19, 'CURSAR'), (25, 20, 'CURSAR'), (25, 23, 'CURSAR'),
(28, 17, 'CURSAR'),
(29, 10, 'CURSAR'), (29, 22, 'CURSAR'),
(36, 25, 'CURSAR'), (36, 26, 'CURSAR'), (36, 30, 'CURSAR'),
(31, 28, 'CURSAR'),
(32, 28, 'CURSAR'),
(33, 18, 'CURSAR'), (33, 27, 'CURSAR'),
(34, 24, 'CURSAR'), (34, 30, 'CURSAR'),
(35, 26, 'CURSAR'), (35, 30, 'CURSAR'),
(102, 6, 'CURSAR'), (103, 102, 'CURSAR'),
(105, 18, 'CURSAR'), (105, 16, 'CURSAR'), (105, 8, 'CURSAR'),
(106, 19, 'CURSAR'), (106, 14, 'CURSAR'),
(107, 19, 'CURSAR'),
(109, 16, 'CURSAR'),
(110, 23, 'CURSAR'), (110, 19, 'CURSAR'), (110, 14, 'CURSAR'),
(112, 9, 'CURSAR'), (112, 17, 'CURSAR'),
(113, 23, 'CURSAR'),
(114, 23, 'CURSAR'),
(115, 14, 'CURSAR'), (115, 15, 'CURSAR'),
(116, 26, 'CURSAR'),
(117, 17, 'CURSAR'), (117, 30, 'CURSAR'),
(118, 25, 'CURSAR'), (118, 23, 'CURSAR'), (118, 19, 'CURSAR'),
(119, 114, 'CURSAR'), (119, 23, 'CURSAR'),
(120, 31, 'CURSAR'), (120, 28, 'CURSAR'),
(121, 33, 'CURSAR'),
(122, 26, 'CURSAR'), (122, 15, 'CURSAR');

-- CORRELATIVIDADES (APROBAR)
INSERT INTO correlatividad (materia_id, correlativa_id, tipo) VALUES
(18, 1, 'APROBAR'), (18, 2, 'APROBAR'),
(19, 5, 'APROBAR'), (19, 6, 'APROBAR'),
(21, 3, 'APROBAR'), (21, 7, 'APROBAR'),
(22, 1, 'APROBAR'), (22, 2, 'APROBAR'),
(23, 4, 'APROBAR'), (23, 6, 'APROBAR'), (23, 8, 'APROBAR'),
(25, 13, 'APROBAR'), (25, 14, 'APROBAR'),
(28, 9, 'APROBAR'),
(29, 9, 'APROBAR'),
(30, 16, 'APROBAR'),
(31, 17, 'APROBAR'), (31, 22, 'APROBAR'),
(32, 17, 'APROBAR'), (32, 19, 'APROBAR'),
(33, 23, 'APROBAR'),
(34, 18, 'APROBAR'),
(35, 20, 'APROBAR'), (35, 21, 'APROBAR'),
(36, 12, 'APROBAR'), (36, 20, 'APROBAR'), (36, 23, 'APROBAR'),
(105, 18, 'APROBAR'), (105, 16, 'APROBAR'),
(107, 19, 'APROBAR'),
(109, 16, 'APROBAR'),
(110, 23, 'APROBAR'), (110, 19, 'APROBAR'),
(113, 23, 'APROBAR'),
(114, 23, 'APROBAR'),
(116, 26, 'APROBAR'),
(117, 17, 'APROBAR'), (117, 30, 'APROBAR'),
(118, 25, 'APROBAR'),
(119, 23, 'APROBAR'),
(120, 31, 'APROBAR'),
(121, 33, 'APROBAR'),
(122, 26, 'APROBAR');

-- ESTADOS INICIALES
INSERT INTO materia_estado (materia_id, estado)
SELECT id, 'PENDIENTE' FROM materia;

INSERT INTO materia (id, nombre, anio, cuatrimestre, es_libre, es_configurable, es_electiva, creditos) 
VALUES (123, 'Seminario Integrador', 3, 2, 0, 0, 1, 4);
INSERT INTO correlatividad (materia_id, correlativa_id, tipo) VALUES 
(123, 16, 'CURSAR'), -- Análisis de Sistemas
(123, 6,  'CURSAR'), -- Algoritmos y Estructura de Datos
(123, 8,  'CURSAR'), -- Sistemas y Procesos de Negocio
(123, 13, 'CURSAR'), -- Sintaxis y Semántica
(123, 14, 'CURSAR'); -- Paradigmas de Programación