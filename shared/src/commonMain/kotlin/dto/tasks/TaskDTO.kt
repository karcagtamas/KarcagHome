package dto.tasks

data class TaskDTO(
    val id: Long,
    val title: String,
    val description: String?,
    val completed: Boolean,
)
