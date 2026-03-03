# Etapa 1: build (compila el proyecto)
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Instala Maven directamente (no necesita mvnw)
RUN apk add --no-cache maven

# Copia los archivos del proyecto
COPY pom.xml .
COPY src ./src

# Compila y genera el JAR (sin correr tests)
RUN mvn clean package -DskipTests

# Etapa 2: runtime (ejecuta el JAR)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]