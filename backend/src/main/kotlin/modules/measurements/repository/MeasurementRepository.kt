package modules.measurements.repository

import kotlinx.datetime.LocalDate
import modules.measurements.data.Measurement
import modules.measurements.data.MeasurementCategory

interface MeasurementRepository {

    fun getCategories(): List<MeasurementCategory>
    fun getCategoryById(id: Long): MeasurementCategory?
    fun createCategory(name: String, color: String, unit: String): MeasurementCategory
    fun updateCategory(id: Long, name: String, color: String, unit: String): MeasurementCategory?
    fun deleteCategory(id: Long): Boolean

    fun getMeasurements(): List<Measurement>
    fun getMeasurementById(id: Long): Measurement?
    fun createMeasurement(value: Double, categoryId: Long, date: LocalDate): Measurement
    fun updateMeasurement(id: Long, value: Double, categoryId: Long, date: LocalDate): Measurement?
    fun deleteMeasurement(id: Long): Boolean
}