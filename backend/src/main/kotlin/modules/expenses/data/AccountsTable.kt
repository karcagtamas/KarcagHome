package modules.expenses.data

import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.datetime.timestamp

object AccountsTable : Table("accounts") {
    val id = long("id").autoIncrement()
    val name = varchar("name", 120)
    val currencyId = long("currency_id")
        .references(CurrenciesTable.id)
    val baseValue = double("base_value")
    val createdAt = timestamp("created_at")

    override val primaryKey = PrimaryKey(id)
}