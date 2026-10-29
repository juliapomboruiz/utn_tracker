# UTN ISI · Tracker de Carrera
### Ingeniería en Sistemas de Información — Plan 2023 · Santa Fe

Aplicación web personal para visualizar y registrar el avance en la carrera, con vista de grilla por año/cuatrimestre y grafo interactivo de correlatividades.

---

## Stack

| Capa       | Tecnología                        |
|------------|-----------------------------------|
| Backend    | Java 21 · Spring Boot 3 · Spring Security (JWT) · JPA |
| Base de datos | PostgreSQL                     |
| Frontend   | Next.js 14 · TypeScript · React   |

---

## Requisitos previos

- Java 21
- Maven
- Node.js 18+
- PostgreSQL corriendo localmente (o una base en la nube)

---

## Setup — Base de datos

1. Creá una base vacía en PostgreSQL (por ejemplo `utn_tracker`).
2. Al levantar el backend, Hibernate crea las tablas (`spring.jpa.hibernate.ddl-auto=update`).
3. Cargá el plan de estudios ejecutando `backend/src/main/resources/db/data.sql`.

---

## Setup — Backend

1. Definí las variables de entorno que lee `application.properties`:

   | Variable | Ejemplo |
   |---|---|
   | `DATABASE_URL` | `jdbc:postgresql://localhost:5432/utn_tracker` |
   | `DATABASE_USER` | `postgres` |
   | `DATABASE_PASSWORD` | `tu_contraseña` |
   | `JWT_SECRET` | una clave larga en Base64 |
   | `CORS_ALLOWED_ORIGINS` | `http://localhost:3000` |

2. Levantá el servidor:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

El backend queda disponible en `http://localhost:8080`. También se puede construir la imagen con el `Dockerfile` de `backend/`.

---

## Setup — Frontend

1. Copiá las variables de entorno (`NEXT_PUBLIC_API_URL` es la URL del backend, sin `/api`):
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
| POST   | `/api/auth/register`        | Registrar usuario (devuelve un JWT)  |
| POST   | `/api/auth/login`           | Iniciar sesión (devuelve un JWT)     |
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
│       │       ├── application.properties
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
