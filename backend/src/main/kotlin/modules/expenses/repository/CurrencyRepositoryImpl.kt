package modules.expenses.repository

import modules.expenses.data.CurrenciesTable
import modules.expenses.data.Currency
import modules.expenses.data.CurrencyMonthlyExchange
import modules.expenses.data.CurrencyMonthlyExchangesTable
import modules.expenses.data.toCurrency
import modules.expenses.data.toExchange
import org.jetbrains.exposed.v1.core.JoinType
import org.jetbrains.exposed.v1.core.alias
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.jdbc.insert
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import org.jetbrains.exposed.v1.jdbc.update
import kotlin.time.Clock

class CurrencyRepositoryImpl : CurrencyRepository {

    override fun getCurrencies(): List<Currency> = transaction {
        CurrenciesTable.selectAll().map { it.toCurrency() }
    }

    override fun getCurrencyById(id: Long): Currency? = transaction {
        CurrenciesTable.selectAll().where { CurrenciesTable.id eq id }.singleOrNull()?.toCurrency()
    }

    override fun createCurrency(name: String, abbreviation: String): Currency = transaction {
        val now = Clock.System.now()

        val row = CurrenciesTable.insert {
            it[CurrenciesTable.name] = name
            it[CurrenciesTable.abbreviation] = abbreviation
            it[CurrenciesTable.createdAt] = now
        }

        getCurrencyById(row[CurrenciesTable.id])!!
    }

    override fun updateCurrency(
        id: Long,
        name: String,
        abbreviation: String
    ): Currency? = transaction {
        val updated = CurrenciesTable.update({ CurrenciesTable.id eq id }) {
            it[CurrenciesTable.name] = name
            it[CurrenciesTable.abbreviation] = abbreviation
        }

        if (updated == 0) return@transaction null
        getCurrencyById(id)
    }

    override fun getYearlyExchangeRates(year: Int): List<CurrencyMonthlyExchange> = transaction {
        val from = CurrenciesTable.alias("from")
        val to = CurrenciesTable.alias("to")

        CurrencyMonthlyExchangesTable
            .join(from, JoinType.INNER) {
                CurrencyMonthlyExchangesTable.currencyFromId eq from[CurrenciesTable.id]
            }.join(to, JoinType.INNER) {
                CurrencyMonthlyExchangesTable.currencyToId eq to[CurrenciesTable.id]
            }
            .selectAll()
            .where { CurrencyMonthlyExchangesTable.year eq year }
            .map {
                val fromCurrency = Currency(
                    id = it[from[CurrenciesTable.id]],
                    name = it[from[CurrenciesTable.name]],
                    abbreviation = it[from[CurrenciesTable.abbreviation]],
                    createdAt = it[from[CurrenciesTable.createdAt]],
                )
                val toCurrency = Currency(
                    id = it[to[CurrenciesTable.id]],
                    name = it[to[CurrenciesTable.name]],
                    abbreviation = it[to[CurrenciesTable.abbreviation]],
                    createdAt = it[to[CurrenciesTable.createdAt]],
                )
                it.toExchange(fromCurrency, toCurrency)
            }
    }
}