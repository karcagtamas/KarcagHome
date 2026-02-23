package dto

import kotlinx.serialization.Serializable

@Serializable
data class MeasurementCategoryDTO(
    val id: String? = null,
    val name: String,
    val color: String,
    val unit: String,
)