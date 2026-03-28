package plugins

import config.DatabaseConfig
import database.DatabaseFactory
import io.ktor.server.application.*
import org.koin.ktor.ext.inject

fun Application.configureDatabase() {
    val config: DatabaseConfig by inject()
    DatabaseFactory.init(config)
}