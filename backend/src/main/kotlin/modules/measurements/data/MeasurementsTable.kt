package modules.measurements.data

import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.datetime.date
import org.jetbrains.exposed.v1.datetime.timestamp

object MeasurementsTable : Table("measurements") {
    val id = long("id").autoIncrement()
    val value = double("value")
    val categoryId = long("category_id")
        .references(MeasurementCategoriesTable.id)
    val date = date("date")
    val createdAt = timestamp("created_at")

    override val primaryKey = PrimaryKey(id)
}