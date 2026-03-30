package dto.measurements

import kotlinx.datetime.LocalDate
import kotlinx.serialization.Serializable

@Serializable
data class MeasurementEditDTO(
    val value: Double,
    val date: LocalDate,
    val categoryId: Long,
)
