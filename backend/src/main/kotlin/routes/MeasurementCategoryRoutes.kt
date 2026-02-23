package routes

import io.ktor.http.HttpStatusCode
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.delete
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.put
import io.ktor.server.routing.route
import model.MeasurementCategory
import repository.MeasurementCategoryRepository

fun Route.measurementCategoryRoutes() {
    route("/measurement-categories") {
        val measurementCategoryRepository = MeasurementCategoryRepository()

        get {
            call.respond(measurementCategoryRepository.getAll())
        }

        get("/{id}") {
            val id = call.parameters["id"]!!
            val measurementCategory = measurementCategoryRepository.get(id)

            if (measurementCategory != null) {
                call.respond(measurementCategory)
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }

        post {
            val measurementCategory = call.receive<MeasurementCategory>()
            measurementCategoryRepository.create(measurementCategory)
            call.respond(HttpStatusCode.Created)
        }

        put("/{id}") {
            val id = call.parameters["id"]!!
            val measurementCategory = call.receive<MeasurementCategory>()
            measurementCategoryRepository.update(id, measurementCategory)
            call.respond(HttpStatusCode.OK)
        }

        delete("/{id}") {
            val id = call.parameters["id"]!!
            measurementCategoryRepository.delete(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}