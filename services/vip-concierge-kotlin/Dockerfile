FROM gradle:8.6-jdk21-alpine AS build
WORKDIR /app
COPY build.gradle.kts settings.gradle.kts* ./
COPY src ./src
RUN gradle build --no-daemon

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8086
CMD ["java", "-jar", "app.jar"]
