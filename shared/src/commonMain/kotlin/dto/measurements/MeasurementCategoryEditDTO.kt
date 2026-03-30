package dto.measurements

import kotlinx.serialization.Serializable

@Serializable
data class MeasurementCategoryEditDTO(
    val name: String,
    val color: String,
    val unit: String,
)