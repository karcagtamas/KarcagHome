package modules.measurements.data

import dto.measurements.MeasurementCategoryDTO
import dto.measurements.MeasurementDTO
import org.jetbrains.exposed.v1.core.ResultRow

fun ResultRow.toMeasurementCategory(): MeasurementCategory = MeasurementCategory(
    id = this[MeasurementCategoriesTable.id],
    name = this[MeasurementCategoriesTable.name],
    color = this[MeasurementCategoriesTable.color],
    unit = this[MeasurementCategoriesTable.unit],
    createdAt = this[MeasurementCategoriesTable.createdAt],
)

fun ResultRow.toMeasurement(category: MeasurementCategory): Measurement = Measurement(
    id = this[MeasurementsTable.id],
    value = this[MeasurementsTable.value],
    createdAt = this[MeasurementsTable.createdAt],
    date = this[MeasurementsTable.date],
    category = category,
)

fun MeasurementCategory.toDTO(): MeasurementCategoryDTO = MeasurementCategoryDTO(
    id = id,
    name = name,
    color = color,
    unit = unit,
    createdAt = createdAt,
)

fun Measurement.toDTO(): MeasurementDTO = MeasurementDTO(
    id = id,
    value = value,
    createdAt = createdAt,
    date = date,
    category = category.toDTO(),
)