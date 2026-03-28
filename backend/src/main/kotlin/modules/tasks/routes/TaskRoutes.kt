package modules.tasks.routes

import io.ktor.http.HttpStatusCode
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.response.respondText
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import io.ktor.server.routing.patch
import io.ktor.server.routing.post
import io.ktor.server.routing.route
import modules.tasks.repository.TaskRepository

fun Route.taskRoutes(repository: TaskRepository) {

    route("/tasks") {
        get {
            call.respond(repository.getAll())
        }

        get("/{id}") {
            val id = call.parameters["id"]?.toLongOrNull() ?: return@get call.respondText("Invalid id")
            val task = repository.getById(id) ?: return@get call.respondText("Not found")

            call.respond(task)
        }

        post {
            val body = call.receive<TaskCreateRequest>()

            val task = repository.create(body.title, body.description)
            call.respond(task)
        }

        patch("/{id}/toggle") {
            val id = call.parameters["id"]?.toLongOrNull() ?: return@patch call.respondText("Invalid id")
            val task = repository.toggle(id) ?: return@patch call.respondText("Not found")

            call.respond(task)
        }
    }
}

data class TaskCreateRequest(val title: String, val description: String? = null)