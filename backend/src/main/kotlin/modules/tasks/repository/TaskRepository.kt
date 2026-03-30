package modules.tasks.repository

import modules.tasks.data.Task

interface TaskRepository {

    fun getAll(): List<Task>
    fun getById(id: Long): Task?
    fun create(title: String, description: String?): Task
    fun update(id: Long, title: String, description: String?): Task?
    fun delete(id: Long): Boolean
    fun toggle(id: Long): Task?
}