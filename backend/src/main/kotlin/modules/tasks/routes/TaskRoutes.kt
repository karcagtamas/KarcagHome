package modules.tasks.routes

import core.idLong
import core.requireAndSend
import core.sendDeleted
import dto.tasks.TaskCompletedChartDTO
import dto.tasks.TaskEditDTO
import dto.tasks.TaskImportanceChartDTO
import dto.tasks.TaskOverdueChartDTO
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime
import modules.tasks.data.toDTO
import modules.tasks.repository.TaskRepository
import kotlin.time.Clock

fun Route.taskRoutes(repository: TaskRepository) {

    route("/tasks") {
        get {
            val importance = call.queryParameters["importance"]?.toIntOrNull()
            val showAll = call.queryParameters["showAll"]?.toBoolean() ?: false
            call.respond(repository.getAll(importance, showAll).map { it.toDTO() })
        }

        get("/{id}") {
            val id = call.idLong()

            call.requireAndSend(repository.getById(id)) { it.toDTO() }
        }

        post {
            val body = call.receive<TaskEditDTO>()

            val task = repository.create(body.title, body.description, body.importance, body.dueDate).toDTO()
            call.respond(task)
        }

        put("/{id}") {
            val id = call.idLong()
            val body = call.receive<TaskEditDTO>()

            call.requireAndSend(
                repository.update(
                    id,
                    body.title,
                    body.description,
                    body.importance,
                    body.dueDate,
                )
            ) { it.toDTO() }
        }

        delete("/{id}") {
            val id = call.idLong()

            call.sendDeleted(repository.delete(id))
        }

        patch("/{id}/toggle") {
            val id = call.idLong()

            call.requireAndSend(repository.toggle(id)) { it.toDTO() }
        }

        route("/charts") {

            get("/completed") {
                val importance = call.queryParameters["importance"]?.toIntOrNull()
                val showAll = call.queryParameters["showAll"]?.toBoolean() ?: false

                val data = repository.getAll(importance, showAll)
                val dataDTO = data.groupBy { it.completed }
                    .map { TaskCompletedChartDTO(it.key, it.value.size) }
                call.respond(dataDTO)
            }

            get("/overdue") {
                val importance = call.queryParameters["importance"]?.toIntOrNull()
                val showAll = call.queryParameters["showAll"]?.toBoolean() ?: false

                val today = Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault()).date

                val data = repository.getAll(importance, showAll)
                val dataDTO = data.groupBy { it.dueDate != null && it.dueDate < today }
                    .map { TaskOverdueChartDTO(it.key, it.value.size) }
                call.respond(dataDTO)
            }

            get("/importance") {
                val importance = call.queryParameters["importance"]?.toIntOrNull()
                val showAll = call.queryParameters["showAll"]?.toBoolean() ?: false

                val data = repository.getAll(importance, showAll)
                val dataDTO = data.groupBy { it.importance }
                    .map { TaskImportanceChartDTO(it.key, it.value.size) }
                call.respond(dataDTO)
            }
        }
    }
}