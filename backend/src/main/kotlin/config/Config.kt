package config

import io.ktor.server.application.Application

fun Application.loadDatabaseConfig(): DatabaseConfig {
    val config = environment.config.config("database")

    return DatabaseConfig(
        driver = config.property("driver").getString(),
        jdbcUrl = config.property("jdbcUrl").getString(),
        user = config.property("user").getString(),
        password = config.property("password").getString(),
        maximumPoolSize = config.property("maximumPoolSize").getString().toInt(),
    )
}