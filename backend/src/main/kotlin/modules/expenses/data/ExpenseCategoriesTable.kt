package modules.expenses.data

import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.datetime.timestamp

object ExpenseCategoriesTable : Table("expense_categories") {
    val id = long("id").autoIncrement()
    val name = varchar("name", 192)
    val color = varchar("color", 20)
    val createdAt = timestamp("created_at")

    override val primaryKey = PrimaryKey(id)
}