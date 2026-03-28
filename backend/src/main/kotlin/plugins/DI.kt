package plugins

import config.getConfig
import config.loadDatabaseConfig
import database.DatabaseFactory
import io.ktor.server.application.*
import io.ktor.server.config.ApplicationConfig
import org.koin.dsl.module
import org.koin.ktor.plugin.Koin
import org.koin.logger.slf4jLogger

val appModule = module {
    single<ApplicationConfig> { get<Application>().getConfig() }
    single { get<Application>().loadDatabaseConfig() }

    single { DatabaseFactory.init(get()) }
}

fun Application.configureDI() {
    install(Koin) {
        slf4jLogger()
        modules(appModule)
    }
}