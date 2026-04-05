package modules.expenses.data

import org.jetbrains.exposed.v1.core.Table

object CurrencyMonthlyExchangesTable : Table("currency_monthly_exchanges") {
    val currencyFromId = long("currency_from_id")
        .references(CurrenciesTable.id)
    val currencyToId = long("currency_to_id")
        .references(CurrenciesTable.id)
    val year = integer("year")
    val month = integer("month")
    val value = double("value")

    override val primaryKey = PrimaryKey(currencyFromId, currencyToId, year, month)
}