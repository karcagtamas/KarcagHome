package modules.tasks.routes

import core.idLong
import core.requireAndSend
import core.sendDeleted
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import modules.tasks.repository.TaskRepository

fun Route.taskRoutes(repository: TaskRepository) {

    route("/tasks") {
        get {
            call.respond(repository.getAll())
        }

        get("/{id}") {
            val id = call.idLong()

            call.requireAndSend(repository.getById(id))
        }

        post {
            val body = call.receive<TaskCreateRequest>()

            val task = repository.create(body.title, body.description)
            call.respond(task)
        }

        put {
            val id = call.idLong()
            val body = call.receive<TaskCreateRequest>()

            call.requireAndSend(repository.update(id, body.title, body.description))
        }

        delete {
            val id = call.idLong()

            call.sendDeleted(repository.delete(id))
        }

        patch("/{id}/toggle") {
            val id = call.idLong()

            call.requireAndSend(repository.toggle(id))
        }
    }
}

data class TaskCreateRequest(val title: String, val description: String? = null)