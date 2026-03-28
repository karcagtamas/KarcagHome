package modules

import io.ktor.server.application.Application

class ModuleRegistry(
    private val modules: List<AppModule>,
) {

    fun registerAll(application: Application) {
        modules.forEach { module ->
            module.run { application.register() }
        }
    }
}