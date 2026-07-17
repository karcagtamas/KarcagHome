package modules.tasks.repository

import kotlinx.datetime.LocalDate
import modules.tasks.data.Task

interface TaskRepository {

    fun getAll(importance: Int? = null, showAll: Boolean = false): List<Task>
    fun getById(id: Long): Task?
    fun create(title: String, description: String?, importance: Int, dueDate: LocalDate?): Task
    fun update(id: Long, title: String, description: String?, importance: Int, dueDate: LocalDate?): Task?
    fun delete(id: Long): Boolean
    fun toggle(id: Long): Task?
}