package modules.measurements.routes

import core.idLong
import core.requireAndSend
import core.sendDeleted
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.datetime.LocalDate
import modules.measurements.repository.MeasurementRepository

fun Route.measurementRoutes(repository: MeasurementRepository) {

    route("/measurements") {

        get {
            call.respond(repository.getMeasurements())
        }

        get("/{id}") {
            val id = call.idLong()

            call.requireAndSend(repository.getMeasurementById(id))
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

        put("/{id}") {
            val id = call.idLong()

            val body = call.receive<CreateMeasurementRequest>()

            call.requireAndSend(repository.updateMeasurement(id, body.value, body.categoryId, body.date))
        }

        delete("/{id}") {
            val id = call.idLong()

            call.sendDeleted(repository.deleteMeasurement(id))
        }
    }

    route("/measurement-categories") {

        get {
            call.respond(repository.getCategories())
        }

        get("/{id}") {
            val id = call.idLong()

            call.requireAndSend(repository.getCategoryById(id))
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

        put("/{id}") {
            val id = call.idLong()

            val body = call.receive<CreateMeasurementCategoryRequest>()

            call.requireAndSend(repository.updateCategory(id, body.name, body.color, body.unit))
        }

        delete("/{id}") {
            val id = call.idLong()

            call.sendDeleted(repository.deleteCategory(id))
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