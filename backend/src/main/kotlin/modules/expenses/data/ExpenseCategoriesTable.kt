package modules.expenses.data

import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.datetime.timestamp

object ExpenseCategoriesTable : Table("expense_categories") {
    val id = long("id").autoIncrement()
    val name = varchar("name", 100)
    val color = varchar("color", 30)
    val typeId = long("type_id")
        .references(ExpenseCategoryTypesTable.id)
    val createdAt = timestamp("created_at")

    override val primaryKey = PrimaryKey(id)
}