package dto.tasks

import kotlinx.serialization.Serializable

@Serializable
data class TaskImportanceChartDTO(val importance: Int, val count: Int)
