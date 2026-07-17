package modules.tasks.data

import kotlinx.datetime.LocalDate

data class Task(
    val id: Long,
    val title: String,
    val description: String?,
    val completed: Boolean,
    val importance: Int,
    val dueDate: LocalDate?,
)