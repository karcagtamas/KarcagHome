package modules.expenses.repository

import modules.expenses.data.CurrenciesTable
import modules.expenses.data.Currency
import modules.expenses.data.toCurrency
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
}