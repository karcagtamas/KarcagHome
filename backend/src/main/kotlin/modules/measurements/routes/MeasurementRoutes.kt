package modules.measurements.routes

import core.idLong
import core.requireAndSend
import core.sendDeleted
import dto.measurements.MeasurementCategoryEditDTO
import dto.measurements.MeasurementEditDTO
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.util.getOrFail
import modules.measurements.data.toDTO
import modules.measurements.repository.MeasurementRepository

fun Route.measurementRoutes(repository: MeasurementRepository) {

    route("/measurements") {

        get {
            val categoryId = call.queryParameters.getOrFail<Long>("categoryId")
            val year = call.queryParameters["year"]?.toIntOrNull()

            call.respond(repository.getMeasurements(categoryId, year).map { it.toDTO() })
        }

        get("/{id}") {
            val id = call.idLong()

            call.requireAndSend(repository.getMeasurementById(id)) { it.toDTO() }
        }

        post {
            val body = call.receive<MeasurementEditDTO>()
            call.respond(
                repository.createMeasurement(
                    body.value,
                    body.categoryId,
                    body.date,
                ).toDTO()
            )
        }

        put("/{id}") {
            val id = call.idLong()
            val body = call.receive<MeasurementEditDTO>()

            call.requireAndSend(
                repository.updateMeasurement(
                    id,
                    body.value,
                    body.categoryId,
                    body.date,
                )
            ) { it.toDTO() }
        }

        delete("/{id}") {
            val id = call.idLong()

            call.sendDeleted(repository.deleteMeasurement(id))
        }

        get("/years") {
            val categoryId = call.queryParameters.getOrFail<Long>("categoryId")

            call.respond(repository.getMeasurementYears(categoryId))
        }
    }

    route("/measurement-categories") {

        get {
            call.respond(repository.getCategories().map { it.toDTO() })
        }

        get("/{id}") {
            val id = call.idLong()

            call.requireAndSend(repository.getCategoryById(id)) { it.toDTO() }
        }

        post {
            val body = call.receive<MeasurementCategoryEditDTO>()

            call.respond(
                repository.createCategory(
                    body.name,
                    body.color,
                    body.unit,
                ).toDTO()
            )
        }

        put("/{id}") {
            val id = call.idLong()
            val body = call.receive<MeasurementCategoryEditDTO>()

            call.requireAndSend(
                repository.updateCategory(
                    id,
                    body.name,
                    body.color,
                    body.unit,
                )
            ) { it.toDTO() }
        }

        delete("/{id}") {
            val id = call.idLong()

            call.sendDeleted(repository.deleteCategory(id))
        }
    }
}