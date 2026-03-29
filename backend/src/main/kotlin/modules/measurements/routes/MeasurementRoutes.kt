package modules.measurements.routes

import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.route
import kotlinx.datetime.LocalDate
import modules.measurements.repository.MeasurementRepository

fun Route.measurementRoutes(repository: MeasurementRepository) {

    route("/measurements") {

        get {
            call.respond(repository.getMeasurements())
        }

        post {
            val body = call.receive<CreateMeasurementRequest>()
            call.respond(
                repository.createMeasurement(
                    body.value,
                    body.categoryId,
                    body.date,
                )
            )
        }
    }

    route("/measurement-categories") {

        get {
            call.respond(repository.getCategories())
        }

        post {
            val body = call.receive<CreateMeasurementCategoryRequest>()

            call.respond(
                repository.createCategory(
                    body.name,
                    body.color,
                    body.unit,
                )
            )
        }
    }
}

data class CreateMeasurementRequest(
    val value: Double,
    val categoryId: Long,
    val date: LocalDate,
)

data class CreateMeasurementCategoryRequest(
    val name: String,
    val color: String,
    val unit: String,
)