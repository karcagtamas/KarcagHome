package modules.expenses.repository

import modules.expenses.data.CurrenciesTable
import modules.expenses.data.Currency
import modules.expenses.data.CurrencyMonthlyExchange
import modules.expenses.data.CurrencyMonthlyExchangesTable
import modules.expenses.data.toCurrency
import modules.expenses.data.toExchange
import org.jetbrains.exposed.v1.core.Alias
import org.jetbrains.exposed.v1.core.JoinType
import org.jetbrains.exposed.v1.core.ResultRow
import org.jetbrains.exposed.v1.core.alias
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.core.and
import org.jetbrains.exposed.v1.jdbc.Query
import org.jetbrains.exposed.v1.jdbc.deleteWhere
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

    override fun getYearlyExchangeRates(year: Int): List<CurrencyMonthlyExchange> =
        getFullExchangeQuery { _, _, mapper ->
            this.where { CurrencyMonthlyExchangesTable.year eq year }
                .map {
                    mapper(it)
                }
        }

    override fun getExchange(
        currencyFromId: Long,
        currencyToId: Long,
        year: Int,
        month: Int
    ): CurrencyMonthlyExchange? = getFullExchangeQuery { _, _, mapper ->
        this.where {
            (CurrencyMonthlyExchangesTable.currencyFromId eq currencyFromId) and
                    (CurrencyMonthlyExchangesTable.currencyToId eq currencyToId) and
                    (CurrencyMonthlyExchangesTable.year eq year) and
                    (CurrencyMonthlyExchangesTable.month eq month)
        }
            .singleOrNull()
            ?.let {
                mapper(it)
            }
    }

    override fun saveExchange(
        currencyFromId: Long,
        currencyToId: Long,
        year: Int,
        month: Int,
        value: Double
    ): CurrencyMonthlyExchange = transaction {
        CurrencyMonthlyExchangesTable.insert {
            it[CurrencyMonthlyExchangesTable.currencyFromId] = currencyFromId
            it[CurrencyMonthlyExchangesTable.currencyToId] = currencyToId
            it[CurrencyMonthlyExchangesTable.year] = year
            it[CurrencyMonthlyExchangesTable.month] = month
            it[CurrencyMonthlyExchangesTable.value] = value
        }

        getExchange(currencyFromId, currencyToId, year, month)!!
    }

    override fun deleteExchange(
        currencyFromId: Long,
        currencyToId: Long,
        year: Int,
        month: Int
    ): Boolean = transaction {
        CurrencyMonthlyExchangesTable.deleteWhere {
            (CurrencyMonthlyExchangesTable.currencyFromId eq currencyFromId) and
                    (CurrencyMonthlyExchangesTable.currencyToId eq currencyToId) and
                    (CurrencyMonthlyExchangesTable.year eq year) and
                    (CurrencyMonthlyExchangesTable.month eq month)
        } > 0
    }

    private fun <T> getFullExchangeQuery(fn: Query.(from: Alias<CurrenciesTable>, to: Alias<CurrenciesTable>, mapper: (row: ResultRow) -> CurrencyMonthlyExchange) -> T): T =
        transaction {
            val from = CurrenciesTable.alias("from")
            val to = CurrenciesTable.alias("to")

            val query = CurrencyMonthlyExchangesTable
                .join(from, JoinType.INNER) {
                    CurrencyMonthlyExchangesTable.currencyFromId eq from[CurrenciesTable.id]
                }.join(to, JoinType.INNER) {
                    CurrencyMonthlyExchangesTable.currencyToId eq to[CurrenciesTable.id]
                }
                .selectAll()

            fn(query, from, to) {
                val fromCurrency = Currency(
                    id = it[from[CurrenciesTable.id]],
                    name = it[from[CurrenciesTable.name]],
                    abbreviation = it[from[CurrenciesTable.abbreviation]],
                    createdAt = it[from[CurrenciesTable.createdAt]],
                    disabled = it[from[CurrenciesTable.disabled]],
                )
                val toCurrency = Currency(
                    id = it[to[CurrenciesTable.id]],
                    name = it[to[CurrenciesTable.name]],
                    abbreviation = it[to[CurrenciesTable.abbreviation]],
                    createdAt = it[to[CurrenciesTable.createdAt]],
                    disabled = it[to[CurrenciesTable.disabled]],
                )
                it.toExchange(fromCurrency, toCurrency)
            }
        }
}