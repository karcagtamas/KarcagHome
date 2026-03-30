package dto.tasks

import kotlinx.serialization.Serializable

@Serializable
data class TaskEditDTO(
    val title: String,
    val description: String? = null,
)