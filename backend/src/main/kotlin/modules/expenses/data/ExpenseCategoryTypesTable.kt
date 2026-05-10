package modules.expenses.data

import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.datetime.timestamp

object ExpenseCategoryTypesTable : Table("expense_category_types") {
    val id = long("id").autoIncrement()
    val name = varchar("name", 100)
    val createdAt = timestamp("created_at")

    override val primaryKey = PrimaryKey(id)
}