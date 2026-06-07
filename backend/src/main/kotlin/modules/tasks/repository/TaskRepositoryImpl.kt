package modules.tasks.repository

import modules.tasks.data.Task
import modules.tasks.data.TasksTable
import modules.tasks.data.TasksTable.importance
import modules.tasks.data.toTask
import org.jetbrains.exposed.v1.core.Op
import org.jetbrains.exposed.v1.core.compoundAnd
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.jdbc.deleteWhere
import org.jetbrains.exposed.v1.jdbc.insert
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import org.jetbrains.exposed.v1.jdbc.update

class TaskRepositoryImpl : TaskRepository {

    override fun getAll(importance: Int?, showAll: Boolean): List<Task> = transaction {
        TasksTable
            .selectAll()
            .let {
                val checks = mutableListOf<Op<Boolean>>()

                if (importance != null) {
                    checks.add((TasksTable.importance eq importance))
                }

                if (!showAll) {
                    checks.add((TasksTable.completed eq false))
                }

                it.where { checks.compoundAnd() }
            }
            .map { it.toTask() }
    }

    override fun getById(id: Long): Task? = transaction {
        TasksTable
            .selectAll()
            .where { TasksTable.id eq id }
            .singleOrNull()
            ?.toTask()
    }

    override fun create(title: String, description: String?, importance: Int): Task = transaction {
        val row = TasksTable.insert {
            it[TasksTable.title] = title
            it[TasksTable.description] = description
            it[completed] = false
            it[TasksTable.importance] = importance
        }

        Task(
            id = row[TasksTable.id],
            title = title,
            description = description,
            completed = false,
            importance = importance,
        )
    }

    override fun update(id: Long, title: String, description: String?, importance: Int): Task? = transaction {
        val updated = TasksTable.update(where = { TasksTable.id eq id }) {
            it[TasksTable.title] = title
            it[TasksTable.description] = description
            it[TasksTable.importance] = importance
        }

        if (updated == 0) return@transaction null

        getById(id)
    }

    override fun delete(id: Long): Boolean = transaction {
        TasksTable.deleteWhere { TasksTable.id eq id } > 0
    }

    override fun toggle(id: Long): Task? = transaction {
        val task = getById(id) ?: return@transaction null

        TasksTable.update({ TasksTable.id eq id }) {
            it[completed] = !task.completed
        }

        getById(id)
    }
}