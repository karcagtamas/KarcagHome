package dto.tasks

import kotlinx.serialization.Serializable

@Serializable
data class TaskCompletedChartDTO(val completed: Boolean, val count: Int)
