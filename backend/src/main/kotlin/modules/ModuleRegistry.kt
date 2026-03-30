package modules

import io.ktor.server.application.Application
import io.ktor.server.routing.Route
import org.koin.core.module.Module

class ModuleRegistry(
    private val modules: List<AppModule>,
) {

    fun registerAll(application: Application) {
        modules.forEach { module ->
            module.run { application.register() }
        }
    }

    fun routesForAll(route: Route) {
        modules.forEach { module ->
            module.run { route.apiRoutes() }
        }
    }

    fun modules(): List<Module> {
        return modules.map { it.module() }
    }
}