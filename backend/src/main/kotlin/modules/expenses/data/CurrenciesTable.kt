package modules.expenses.data

import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.datetime.timestamp

object CurrenciesTable : Table("currencies") {
    val id = long("id").autoIncrement()
    val name = varchar("name", 240)
    val abbreviation = varchar("abbreviation", 12)
    val createdAt = timestamp("created_at")

    override val primaryKey = PrimaryKey(id)
}