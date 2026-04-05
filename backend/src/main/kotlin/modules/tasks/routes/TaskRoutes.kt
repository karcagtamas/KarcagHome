package modules.tasks.routes

import core.idLong
import core.requireAndSend
import core.sendDeleted
import dto.tasks.TaskEditDTO
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import modules.tasks.data.toDTO
import modules.tasks.repository.TaskRepository

fun Route.taskRoutes(repository: TaskRepository) {

    route("/tasks") {
        get {
            call.respond(repository.getAll().map { it.toDTO() })
        }

        get("/{id}") {
            val id = call.idLong()

            call.requireAndSend(repository.getById(id)) { it.toDTO() }
        }

        post {
            val body = call.receive<TaskEditDTO>()

            val task = repository.create(body.title, body.description).toDTO()
            call.respond(task)
        }

        put {
            val id = call.idLong()
            val body = call.receive<TaskEditDTO>()

            call.requireAndSend(repository.update(id, body.title, body.description)) { it.toDTO() }
        }

        delete {
            val id = call.idLong()

            call.sendDeleted(repository.delete(id))
        }

        patch("/{id}/toggle") {
            val id = call.idLong()

            call.requireAndSend(repository.toggle(id)) { it.toDTO() }
        }
    }
}