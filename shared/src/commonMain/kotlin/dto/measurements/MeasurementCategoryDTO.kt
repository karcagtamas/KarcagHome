package dto.measurements

import kotlinx.serialization.Serializable
import kotlin.time.Instant

@Serializable
data class MeasurementCategoryDTO(
    val id: Long,
    val name: String,
    val color: String,
    val unit: String,
    val createdAt: Instant,
)