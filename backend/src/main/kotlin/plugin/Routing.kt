package plugin

import io.ktor.server.routing.Routing
import io.ktor.server.routing.route
import route.measurementCategoryRoutes
import route.measurementRoutes

fun Routing.api() {
    route("/api") {
        measurementRoutes()
        measurementCategoryRoutes()
    }
}