USE utn_tracker;

-- ─── MATERIAS ────────────────────────────────────────────────────────────────
-- Columnas: id, nombre, anio, cuatrimestre (0=Anual), es_libre, es_configurable

INSERT INTO materia VALUES
-- AÑO 1
(1,  'Análisis Matemático I',           1, 0, FALSE, FALSE),
(2,  'Álgebra y Geometría Analítica',   1, 0, FALSE, FALSE),
(3,  'Física I',                        1, 0, FALSE, FALSE),
(6,  'Algoritmos y Estr. de Datos',     1, 0, FALSE, FALSE),
(7,  'Arquitectura de Computadoras',    1, 0, FALSE, FALSE),
(5,  'Lógica y Estructuras Discretas',  1, 1, FALSE, FALSE),
(8,  'Sistemas y Proc. de Negocio',     1, 2, FALSE, FALSE),
-- AÑO 2
(4,  'Inglés I',                        2, 0, TRUE,  FALSE),
(9,  'Análisis Matemático II',          2, 0, FALSE, FALSE),
(10, 'Física II',                       2, 0, FALSE, FALSE),
(16, 'Análisis de Sistemas de Inf.',    2, 0, FALSE, FALSE),
(13, 'Sintaxis y Semántica',            2, 1, FALSE, FALSE),
(11, 'Ingeniería y Sociedad',           2, 2, FALSE, TRUE ),   -- configurable: 1 o 2
(14, 'Paradigmas de Programación',      2, 2, FALSE, FALSE),
(15, 'Sistemas Operativos',             2, 2, FALSE, FALSE),
-- AÑO 3
(12, 'Inglés II',                       3, 0, TRUE,  FALSE),
(22, 'Análisis Numérico',               3, 0, FALSE, FALSE),
(23, 'Diseño de Sistemas de Inf.',      3, 0, FALSE, FALSE),
(18, 'Economía',                        3, 1, FALSE, FALSE),
(19, 'Bases de Datos',                  3, 1, FALSE, FALSE),
(21, 'Comunicación de Datos',           3, 1, FALSE, FALSE),
(17, 'Probabilidad y Estadísticas',     3, 2, FALSE, FALSE),
(20, 'Desarrollo de Software',          3, 2, FALSE, FALSE),
-- AÑO 4
(30, 'Adm. de Sistemas de Inf.',        4, 0, FALSE, FALSE),
(24, 'Legislación',                     4, 1, FALSE, FALSE),
(26, 'Redes de Datos',                  4, 1, FALSE, FALSE),
(27, 'Investigación Operativa',         4, 1, FALSE, FALSE),
(25, 'Ing. y Calidad de Software',      4, 2, FALSE, FALSE),
(28, 'Simulación',                      4, 2, FALSE, FALSE),
(29, 'Tecnologías para Autom.',         4, 1, FALSE, TRUE ),   -- configurable: 1 o 2
-- AÑO 5
(36, 'Proyecto Final',                  5, 0, FALSE, FALSE),
(31, 'Inteligencia Artificial',         5, 1, FALSE, FALSE),
(32, 'Ciencia de Datos',                5, 1, FALSE, FALSE),
(33, 'Sistemas de Gestión',             5, 1, FALSE, FALSE),
(34, 'Gestión Gerencial',               5, 2, FALSE, FALSE),
(35, 'Seguridad en los Sist. de Inf.',  5, 2, FALSE, FALSE);

-- ─── CORRELATIVIDADES PARA CURSAR ────────────────────────────────────────────
INSERT INTO correlatividad (materia_id, correlativa_id, tipo) VALUES
-- Año 2
(9,  1,  'CURSAR'), (9,  2,  'CURSAR'),
(10, 1,  'CURSAR'), (10, 3,  'CURSAR'),
(16, 6,  'CURSAR'), (16, 8,  'CURSAR'),
(13, 5,  'CURSAR'), (13, 6,  'CURSAR'),
(14, 5,  'CURSAR'), (14, 6,  'CURSAR'),
(15, 7,  'CURSAR'),
-- Año 3
(19, 13, 'CURSAR'), (19, 16, 'CURSAR'),
(17, 1,  'CURSAR'), (17, 2,  'CURSAR'),
(20, 14, 'CURSAR'), (20, 16, 'CURSAR'),
(22, 9,  'CURSAR'),
(23, 14, 'CURSAR'), (23, 16, 'CURSAR'),
-- Año 4
(30, 18, 'CURSAR'), (30, 23, 'CURSAR'),
(24, 11, 'CURSAR'),
(26, 15, 'CURSAR'), (26, 21, 'CURSAR'),
(27, 17, 'CURSAR'), (27, 22, 'CURSAR'),
(25, 19, 'CURSAR'), (25, 20, 'CURSAR'), (25, 23, 'CURSAR'),
(28, 17, 'CURSAR'),
(29, 10, 'CURSAR'), (29, 22, 'CURSAR'),
-- Año 5
(36, 25, 'CURSAR'), (36, 26, 'CURSAR'), (36, 30, 'CURSAR'),
(31, 28, 'CURSAR'),
(32, 28, 'CURSAR'),
(33, 18, 'CURSAR'), (33, 27, 'CURSAR'),
(34, 24, 'CURSAR'), (34, 30, 'CURSAR'),
(35, 26, 'CURSAR'), (35, 30, 'CURSAR');

-- ─── CORRELATIVIDADES PARA APROBAR (RENDIR) ──────────────────────────────────
INSERT INTO correlatividad (materia_id, correlativa_id, tipo) VALUES
-- Año 3
(18, 1,  'APROBAR'), (18, 2,  'APROBAR'),
(19, 5,  'APROBAR'), (19, 6,  'APROBAR'),
(21, 3,  'APROBAR'), (21, 7,  'APROBAR'),
(22, 1,  'APROBAR'), (22, 2,  'APROBAR'),
(23, 4,  'APROBAR'), (23, 6,  'APROBAR'), (23, 8,  'APROBAR'),
-- Año 4
(25, 13, 'APROBAR'), (25, 14, 'APROBAR'),
(28, 9,  'APROBAR'),
(29, 9,  'APROBAR'),
(30, 16, 'APROBAR'),
-- Año 5
(31, 17, 'APROBAR'), (31, 22, 'APROBAR'),
(32, 17, 'APROBAR'), (32, 19, 'APROBAR'),
(33, 23, 'APROBAR'),
(34, 18, 'APROBAR'),
(35, 20, 'APROBAR'), (35, 21, 'APROBAR'),
(36, 12, 'APROBAR'), (36, 20, 'APROBAR'), (36, 23, 'APROBAR');

-- ─── ESTADOS INICIALES (una fila por materia, todas PENDIENTE) ───────────────
INSERT INTO materia_estado (materia_id, estado)
SELECT id, 'PENDIENTE' FROM materia;
