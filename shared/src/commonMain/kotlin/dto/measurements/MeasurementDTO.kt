package dto.measurements

import kotlinx.datetime.LocalDate
import kotlinx.serialization.Serializable
import kotlin.time.Instant

@Serializable
data class MeasurementDTO(
    val id: Long,
    val value: Double,
    val createdAt: Instant,
    val date: LocalDate,
    val category: MeasurementCategoryDTO,
)
