package modules.tasks.repository

import modules.tasks.data.Task
import modules.tasks.data.TasksTable
import modules.tasks.data.toTask
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.jdbc.insert
import org.jetbrains.exposed.v1.jdbc.select
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import org.jetbrains.exposed.v1.jdbc.update

class TaskRepositoryImpl : TaskRepository {

    override fun getAll(): List<Task> = transaction {
        TasksTable.selectAll().map { it.toTask() }
    }

    override fun getById(id: Long): Task? = transaction {
        TasksTable
            .select(TasksTable.id eq id)
            .map { it.toTask() }
            .singleOrNull()
    }

    override fun create(title: String, description: String?): Task = transaction {
        val insertedRow = TasksTable.insert {
            it[TasksTable.title] = title
            it[TasksTable.description] = description
            it[completed] = false
        }

        val id = insertedRow[TasksTable.id]

        TasksTable
            .select(TasksTable.id eq id)
            .single()
            .toTask()
    }

    override fun toggle(id: Long): Task? = transaction {
        val task = getById(id) ?: return@transaction null

        TasksTable.update({ TasksTable.id eq id }) {
            it[completed] = !task.completed
        }

        getById(id)
    }
}