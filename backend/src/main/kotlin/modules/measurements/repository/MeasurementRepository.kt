package modules.measurements.repository

import kotlinx.datetime.LocalDate
import modules.measurements.data.Measurement
import modules.measurements.data.MeasurementCategory

interface MeasurementRepository {

    fun getCategories(): List<MeasurementCategory>

    fun createCategory(name: String, color: String, unit: String): MeasurementCategory

    fun getMeasurements(): List<Measurement>

    fun createMeasurement(
        value: Double,
        categoryId: Long,
        date: LocalDate,
    ): Measurement
}