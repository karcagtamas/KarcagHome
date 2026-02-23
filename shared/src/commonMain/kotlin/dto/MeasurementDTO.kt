package dto

import kotlinx.serialization.Serializable
import kotlin.time.Instant

@Serializable
data class MeasurementDTO(
    val id: String? = null,
    val value: Double,
    val categoryId: String,
    val date: Instant,
)
