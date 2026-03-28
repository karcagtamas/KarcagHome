package plugins

import database.DatabaseFactory
import io.ktor.server.application.Application
import org.koin.ktor.ext.get

fun Application.configureDatabase() {
    get<DatabaseFactory>()
}