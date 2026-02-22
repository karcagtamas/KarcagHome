FROM gradle:9.0.0-jdk-21-and-24 as BUILD
WORKDIR /app
COPY . .
RUN gradle :backend:installDist

FROM eclipse-temurin:24
WORKDIR /app
COPY --from=BUILD /app/backend/build/install/backend .
CMD ["bin/backend"]