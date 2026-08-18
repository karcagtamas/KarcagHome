package dto.tasks

import kotlinx.datetime.LocalDate
import kotlinx.serialization.Serializable

@Serializable
data class TaskEditDTO(
    val title: String,
    val description: String? = null,
    val importance: Int,
    val dueDate: LocalDate? = null,
)