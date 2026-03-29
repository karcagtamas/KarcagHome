package modules.measurements.repository

import kotlinx.datetime.LocalDate
import modules.measurements.data.*
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.jdbc.insert
import org.jetbrains.exposed.v1.jdbc.select
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import kotlin.time.Clock

class MeasurementRepositoryImpl : MeasurementRepository {

    override fun getCategories(): List<MeasurementCategory> = transaction {
        MeasurementCategoriesTable
            .selectAll()
            .map { it.toMeasurementCategory() }
    }

    override fun createCategory(
        name: String,
        color: String,
        unit: String
    ): MeasurementCategory = transaction {
        val now = Clock.System.now()

        val row = MeasurementCategoriesTable.insert {
            it[MeasurementCategoriesTable.name] = name
            it[MeasurementCategoriesTable.color] = color
            it[MeasurementCategoriesTable.unit] = unit
            it[createdAt] = now
        }

        MeasurementCategory(
            id = row[MeasurementCategoriesTable.id],
            name = name,
            color = color,
            unit = unit,
            createdAt = now,
        )
    }

    override fun getMeasurements(): List<Measurement> = transaction {
        val categories = MeasurementCategoriesTable
            .selectAll()
            .associateBy { it[MeasurementCategoriesTable.id] }
            .mapValues { it.value.toMeasurementCategory() }

        MeasurementsTable
            .selectAll()
            .map {
                val category = categories[it[MeasurementsTable.categoryId]]!!
                it.toMeasurement(category)
            }
    }

    override fun createMeasurement(
        value: Double,
        categoryId: Long,
        date: LocalDate
    ): Measurement = transaction {
        val now = Clock.System.now()

        val row = MeasurementsTable.insert {
            it[MeasurementsTable.value] = value
            it[MeasurementsTable.categoryId] = categoryId
            it[MeasurementsTable.date] = date
            it[createdAt] = now
        }

        val category = MeasurementCategoriesTable
            .select(MeasurementCategoriesTable.id eq categoryId)
            .single()
            .toMeasurementCategory()

        Measurement(
            id = row[MeasurementsTable.id],
            value = value,
            category = category,
            date = date,
            createdAt = now,
        )
    }
}