package dto.tasks

import kotlinx.serialization.Serializable

@Serializable
data class TaskOverdueChartDTO(val overdue: Boolean, val count: Int)
