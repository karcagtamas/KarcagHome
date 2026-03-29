package modules.measurements.data

import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.datetime.timestamp

object MeasurementCategoriesTable : Table("measurement_categories") {
    val id = long("id").autoIncrement()
    val name = varchar("name", 100)
    val color = varchar("color", 20)
    val unit = varchar("unit", 20)
    val createdAt = timestamp("created_at")

    override val primaryKey = PrimaryKey(id)
}