package plugins

import io.ktor.server.routing.Routing
import io.ktor.server.routing.route
import routes.measurementCategoryRoutes
import routes.measurementRoutes

fun Routing.api() {
    route("/api") {
        measurementRoutes()
        measurementCategoryRoutes()
    }
}