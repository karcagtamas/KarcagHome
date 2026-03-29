package modules.tasks

import io.ktor.server.application.Application
import io.ktor.server.routing.route
import io.ktor.server.routing.routing
import modules.AppModule
import modules.tasks.repository.TaskRepository
import modules.tasks.repository.TaskRepositoryImpl
import modules.tasks.routes.taskRoutes
import org.koin.dsl.module
import org.koin.ktor.ext.inject

class TasksModule : AppModule {

    override fun Application.register() {
        val repository by inject<TaskRepository>()

        routing {
            route("/api") {
                taskRoutes(repository)
            }
        }
    }
}

val tasksModule = module {
    single<TaskRepository> { TaskRepositoryImpl() }
}