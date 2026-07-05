package modules.measurements.repository

import kotlinx.datetime.LocalDate
import modules.measurements.data.*
import org.jetbrains.exposed.v1.core.and
import org.jetbrains.exposed.v1.core.between
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.core.greaterEq
import org.jetbrains.exposed.v1.core.innerJoin
import org.jetbrains.exposed.v1.core.lessEq
import org.jetbrains.exposed.v1.jdbc.deleteWhere
import org.jetbrains.exposed.v1.jdbc.insert
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
            .selectAll()
            .where { MeasurementCategoriesTable.id eq id }
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

        getCategoryById(row[MeasurementCategoriesTable.id])!!
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

    override fun getMeasurements(categoryId: Long, year: Int?): List<Measurement> = transaction {
        val join = MeasurementsTable.innerJoin(
            MeasurementCategoriesTable,
            { MeasurementsTable.categoryId },
            { MeasurementCategoriesTable.id }
        )

        join
            .selectAll()
            .where {
                var condition = (MeasurementsTable.id eq categoryId)

                if (year != null) {
                    val start = LocalDate(year, 1, 1)
                    val end = LocalDate(year, 12, 31)

                    condition = (MeasurementsTable.date greaterEq start) and (MeasurementsTable.date lessEq end)
                }

                condition
            }
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

    override fun getMeasurementYears(categoryId: Long): List<Int> = transaction {
        MeasurementsTable
            .selectAll()
            .where { MeasurementsTable.categoryId eq categoryId }
            .map { it[MeasurementsTable.date].year }
    }
}