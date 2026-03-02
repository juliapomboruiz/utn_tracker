# UTN ISI · Tracker de Carrera
### Ingeniería en Sistemas de Información — Plan 2023 · Santa Fe

Aplicación web personal para visualizar y registrar el avance en la carrera, con vista de grilla por año/cuatrimestre y grafo interactivo de correlatividades.

---

## Stack

| Capa       | Tecnología                        |
|------------|-----------------------------------|
| Backend    | Java 21 · Spring Boot 3 · JPA     |
| Base de datos | MySQL 8                        |
| Frontend   | Next.js 14 · TypeScript · React   |

---

## Requisitos previos

- Java 21
- Maven
- Node.js 18+
- MySQL 8 corriendo localmente
- VS Code con extensión **MySQL** (cweijan)

---

## Setup — Base de datos

1. Abrí VS Code y conectate a tu instancia MySQL local
2. Ejecutá los scripts en orden:
   ```
   backend/src/main/resources/db/schema.sql
   backend/src/main/resources/db/data.sql
   ```

---

## Setup — Backend

1. Copiá el archivo de propiedades de ejemplo:
   ```bash
   cp backend/src/main/resources/application.properties.example \
      backend/src/main/resources/application.properties
   ```

2. Completá tu usuario y contraseña de MySQL en `application.properties`

3. Levantá el servidor:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

El backend queda disponible en `http://localhost:8080`

---

## Setup — Frontend

1. Copiá las variables de entorno:
   ```bash
   cp frontend/.env.local.example frontend/.env.local
   ```

2. Instalá dependencias y arrancá:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

La app queda disponible en `http://localhost:3000`

---

## Endpoints disponibles

| Método | Endpoint                    | Descripción                          |
|--------|-----------------------------|--------------------------------------|
| GET    | `/api/materias`             | Todas las materias con estado        |
| PUT    | `/api/materias/{id}/estado` | Actualizar estado y nota             |
| GET    | `/api/progreso`             | Estadísticas generales               |

---

## Estructura del repo

```
utn-isi-tracker/
├── backend/          Spring Boot
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/...  domain · repository · service · controller · dto
│       │   └── resources/
│       │       ├── application.properties.example
│       │       └── db/
│       │           ├── schema.sql
│       │           └── data.sql
│       └── test/     Tests con Mockito
└── frontend/         Next.js 14
    └── src/
        ├── app/      grilla/ · grafo/
        ├── components/
        ├── hooks/
        ├── lib/      api.ts
        └── types/    index.ts
```

---

## Tests

```bash
cd backend
mvn test
```
