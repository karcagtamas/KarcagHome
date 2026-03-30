package modules.tasks.data

import dto.tasks.TaskDTO
import org.jetbrains.exposed.v1.core.ResultRow

fun ResultRow.toTask() = Task(
    id = this[TasksTable.id],
    title = this[TasksTable.title],
    description = this[TasksTable.description],
    completed = this[TasksTable.completed],
)

fun Task.toDTO(): TaskDTO = TaskDTO(
    id = id,
    title = title,
    description = description,
    completed = completed,
)