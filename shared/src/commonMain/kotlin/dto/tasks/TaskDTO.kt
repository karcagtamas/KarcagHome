package dto.tasks

import kotlinx.serialization.Serializable

@Serializable
data class TaskDTO(
    val id: Long,
    val title: String,
    val description: String?,
    val completed: Boolean,
)
