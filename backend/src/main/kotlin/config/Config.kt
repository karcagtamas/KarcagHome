package config

import com.typesafe.config.ConfigFactory
import io.ktor.server.application.Application
import io.ktor.server.config.ApplicationConfig
import io.ktor.server.config.HoconApplicationConfig
import io.ktor.server.config.withFallback
import org.koin.ktor.ext.get

fun Application.getConfig(): ApplicationConfig {
    val env = environment.config.propertyOrNull("ktor.environment")?.getString()
        ?: System.getenv("KTOR_ENV")
        ?: "dev"

    return HoconApplicationConfig(ConfigFactory.load("application-$env.conf")).withFallback(environment.config)
}

fun Application.loadDatabaseConfig(): DatabaseConfig {
    val config = get<ApplicationConfig>().config("database")

    return DatabaseConfig(
        driver = config.property("driver").getString(),
        jdbcUrl = config.property("jdbcUrl").getString(),
        user = config.property("user").getString(),
        password = config.property("password").getString(),
        maximumPoolSize = config.property("maximumPoolSize").getString().toInt(),
    )
}