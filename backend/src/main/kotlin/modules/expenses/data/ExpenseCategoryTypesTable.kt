package modules.expenses.data

import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.core.or
import org.jetbrains.exposed.v1.datetime.timestamp

object ExpenseCategoryTypesTable : Table("expense_category_types") {
    val id = long("id").autoIncrement()
    val name = varchar("name", 100)
    val color = varchar("color", 30).default("#FFFFFF")
    val createdAt = timestamp("created_at")
    val sign = short("sign")
        .default(1)
        .check { (it eq 1) or (it eq -1) }

    override val primaryKey = PrimaryKey(id)
}