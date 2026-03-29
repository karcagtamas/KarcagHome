package modules.measurements.data

import kotlinx.datetime.LocalDate
import kotlin.time.Instant

data class Measurement(
    val id: Long,
    val value: Double,
    val createdAt: Instant,
    val date: LocalDate,
    val category: MeasurementCategory,
)
