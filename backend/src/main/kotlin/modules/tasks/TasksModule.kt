package modules.tasks

import io.ktor.server.application.*
import io.ktor.server.routing.*
import modules.AppModule
import modules.tasks.repository.TaskRepository
import modules.tasks.repository.TaskRepositoryImpl
import modules.tasks.routes.taskRoutes
import org.koin.core.module.Module
import org.koin.dsl.module
import org.koin.ktor.ext.inject

class TasksModule : AppModule {

    override fun Application.register() {}

    override fun Route.apiRoutes() {
        val repository by inject<TaskRepository>()

        taskRoutes(repository)
    }

    override fun module(): Module = module {
        single<TaskRepository> { TaskRepositoryImpl() }
    }
}