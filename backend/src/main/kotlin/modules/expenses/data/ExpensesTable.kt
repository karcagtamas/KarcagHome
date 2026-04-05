package modules.expenses.data

import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.datetime.date
import org.jetbrains.exposed.v1.datetime.timestamp

object ExpensesTable : Table("expenses") {
    val id = long("id").autoIncrement()
    val amount = double("amount")
    val description = text("description").nullable()
    val categoryId = long("category_id")
        .references(ExpenseCategoriesTable.id)
    val date = date("date")
    val createdAt = timestamp("created_at")

    override val primaryKey = PrimaryKey(id)
}