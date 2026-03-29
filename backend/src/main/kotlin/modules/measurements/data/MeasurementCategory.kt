package modules.measurements.data

import kotlin.time.Instant

data class MeasurementCategory(
    val id: Long,
    val name: String,
    val color: String,
    val unit: String,
    val createdAt: Instant,
)
