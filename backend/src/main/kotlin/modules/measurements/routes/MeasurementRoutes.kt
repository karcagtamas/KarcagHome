package modules.measurements.routes

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
            val id = call.parameters["id"]?.toLongOrNull()
                ?: return@get call.respondText("Invalid id")

            repository.getMeasurementById(id)
                ?.let { call.respond(it) }
                ?: call.respondText("Not found")
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
            val id = call.parameters["id"]?.toLongOrNull()
                ?: return@put call.respondText("Invalid id")

            val body = call.receive<CreateMeasurementRequest>()

            repository.updateMeasurement(id, body.value, body.categoryId, body.date)
                ?.let { call.respond(it) }
                ?: call.respondText("Not found")
        }

        delete("/{id}") {
            val id = call.parameters["id"]?.toLongOrNull()
                ?: return@delete call.respondText("Invalid id")

            if (repository.deleteMeasurement(id)) call.respondText("Deleted")
            else call.respondText("Not found")
        }
    }

    route("/measurement-categories") {

        get {
            call.respond(repository.getCategories())
        }

        get("/{id}") {
            val id = call.parameters["id"]?.toLongOrNull()
                ?: return@get call.respondText("Invalid id")

            repository.getCategoryById(id)
                ?.let { call.respond(it) }
                ?: call.respondText("Not found")
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
            val id = call.parameters["id"]?.toLongOrNull()
                ?: return@put call.respondText("Invalid id")

            val body = call.receive<CreateMeasurementCategoryRequest>()

            repository.updateCategory(id, body.name, body.color, body.unit)
                ?.let { call.respond(it) }
                ?: call.respondText("Not found")
        }

        delete("{id}") {
            val id = call.parameters["id"]?.toLongOrNull()
                ?: return@delete call.respondText("Invalid id")

            if (repository.deleteCategory(id)) call.respondText("Deleted")
            else call.respondText("Not found")
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