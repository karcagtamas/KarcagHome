package modules

import io.ktor.server.application.Application

interface AppModule {
    fun Application.register()
}