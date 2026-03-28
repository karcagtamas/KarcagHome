package plugins

import config.getConfig
import config.loadDatabaseConfig
import io.ktor.server.application.*
import io.ktor.server.config.*
import modules.ModuleRegistry
import modules.tasks.TasksModule
import modules.tasks.tasksModule
import org.koin.dsl.module
import org.koin.ktor.plugin.Koin
import org.koin.logger.slf4jLogger

val appModule = module {
    single<ApplicationConfig> { get<Application>().getConfig() }
    single { get<Application>().loadDatabaseConfig() }

    single {
        ModuleRegistry(
            modules = listOf(TasksModule()),
        )
    }
}

fun Application.configureDI() {
    install(Koin) {
        slf4jLogger()
        modules(
            module { single { this@configureDI } },
            appModule,
            tasksModule,
        )
    }
}