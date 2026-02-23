package route

import dto.MeasurementDTO
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
            call.respond(measurementRepository.getAll().map { it.toDTO() })
        }

        get("/{id}") {
            val id = call.parameters["id"]!!
            val measurement = measurementRepository.get(id)?.toDTO()

            if (measurement != null) {
                call.respond(measurement)
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }

        post {
            val measurementCategory = call.receive<MeasurementDTO>()
            measurementRepository.create(measurementCategory)
            call.respond(HttpStatusCode.Created)
        }

        put("/{id}") {
            val id = call.parameters["id"]!!
            val measurementCategory = call.receive<MeasurementDTO>()
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