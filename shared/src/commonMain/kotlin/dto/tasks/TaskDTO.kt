package dto.tasks

import kotlinx.datetime.LocalDate
import kotlinx.serialization.Serializable

@Serializable
data class TaskDTO(
    val id: Long,
    val title: String,
    val description: String?,
    val completed: Boolean,
    val importance: Int,
    val dueDate: LocalDate?,
)
