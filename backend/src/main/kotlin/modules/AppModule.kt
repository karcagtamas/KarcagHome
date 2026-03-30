package modules

import io.ktor.server.application.Application
import io.ktor.server.routing.Route
import org.koin.core.module.Module

interface AppModule {
    fun Application.register()

    fun Route.apiRoutes()

    fun module(): Module
}