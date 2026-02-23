package routes

import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import model.Measurement
import repository.MeasurementRepository

fun Route.measurementRoutes() {
    route("/measurements") {
        val measurementRepository = MeasurementRepository()

        get {
            call.respond(measurementRepository.getAll())
        }

        get("/{id}") {
            val id = call.parameters["id"]!!
            val measurement = measurementRepository.get(id)

            if (measurement != null) {
                call.respond(measurement)
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }

        post {
            val measurementCategory = call.receive<Measurement>()
            measurementRepository.create(measurementCategory)
            call.respond(HttpStatusCode.Created)
        }

        put("/{id}") {
            val id = call.parameters["id"]!!
            val measurementCategory = call.receive<Measurement>()
            measurementRepository.update(id, measurementCategory)
            call.respond(HttpStatusCode.OK)
        }

        delete("/{id}") {
            val id = call.parameters["id"]!!
            measurementRepository.delete(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}