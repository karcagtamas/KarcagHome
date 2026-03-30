package modules.measurements.repository

import kotlinx.datetime.LocalDate
import modules.measurements.data.*
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.core.innerJoin
import org.jetbrains.exposed.v1.jdbc.deleteWhere
import org.jetbrains.exposed.v1.jdbc.insert
import org.jetbrains.exposed.v1.jdbc.select
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import org.jetbrains.exposed.v1.jdbc.update
import kotlin.time.Clock

class MeasurementRepositoryImpl : MeasurementRepository {

    override fun getCategories(): List<MeasurementCategory> = transaction {
        MeasurementCategoriesTable
            .selectAll()
            .map { it.toMeasurementCategory() }
    }

    override fun getCategoryById(id: Long): MeasurementCategory? = transaction {
        MeasurementCategoriesTable
            .select(MeasurementCategoriesTable.id eq id)
            .singleOrNull()
            ?.toMeasurementCategory()
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

    override fun updateCategory(
        id: Long,
        name: String,
        color: String,
        unit: String
    ): MeasurementCategory? = transaction {
        val updated = MeasurementCategoriesTable.update(where = { MeasurementCategoriesTable.id eq id }) {
            it[MeasurementCategoriesTable.name] = name
            it[MeasurementCategoriesTable.color] = color
            it[MeasurementCategoriesTable.unit] = unit
        }

        if (updated == 0) return@transaction null

        getCategoryById(id)
    }

    override fun deleteCategory(id: Long): Boolean = transaction {
        MeasurementCategoriesTable.deleteWhere { MeasurementCategoriesTable.id eq id } > 0
    }

    override fun getMeasurements(): List<Measurement> = transaction {
        val join = MeasurementsTable.innerJoin(
            MeasurementCategoriesTable,
            { categoryId },
            { MeasurementCategoriesTable.id }
        )

        join
            .selectAll()
            .map {
                val category = it.toMeasurementCategory()
                it.toMeasurement(category)
            }
    }

    override fun getMeasurementById(id: Long): Measurement? = transaction {
        val join = MeasurementsTable.innerJoin(
            MeasurementCategoriesTable,
            { categoryId },
            { MeasurementCategoriesTable.id }
        )

        join
            .selectAll()
            .where { MeasurementsTable.id eq id }
            .singleOrNull()
            ?.let {
                val category = it.toMeasurementCategory()
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

        getMeasurementById(row[MeasurementsTable.id])!!
    }

    override fun updateMeasurement(
        id: Long,
        value: Double,
        categoryId: Long,
        date: LocalDate
    ): Measurement? = transaction {
        val updated = MeasurementsTable.update(
            where = { MeasurementsTable.id eq id }
        ) {
            it[MeasurementsTable.value] = value
            it[MeasurementsTable.categoryId] = categoryId
            it[MeasurementsTable.date] = date
        }

        if (updated == 0) return@transaction null

        getMeasurementById(id)
    }

    override fun deleteMeasurement(id: Long): Boolean = transaction {
        MeasurementsTable.deleteWhere {
            MeasurementsTable.id eq id
        } > 0
    }
}