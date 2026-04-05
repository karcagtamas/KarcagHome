package modules.expenses.repository

import modules.expenses.data.Account
import modules.expenses.data.AccountsTable
import modules.expenses.data.CurrenciesTable
import modules.expenses.data.toAccount
import modules.expenses.data.toCurrency
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.core.innerJoin
import org.jetbrains.exposed.v1.jdbc.deleteWhere
import org.jetbrains.exposed.v1.jdbc.insert
import org.jetbrains.exposed.v1.jdbc.select
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import org.jetbrains.exposed.v1.jdbc.update
import kotlin.time.Clock

class AccountRepositoryImpl : AccountRepository {
    override fun getAccounts(): List<Account> = transaction {
        val join = AccountsTable.innerJoin(
            CurrenciesTable,
            { AccountsTable.currencyId },
            { CurrenciesTable.id }
        )
        join.selectAll().map {
            it.toAccount(it.toCurrency())
        }
    }

    override fun getAccountById(id: Long): Account? = transaction {
        val join = AccountsTable.innerJoin(
            CurrenciesTable,
            { AccountsTable.currencyId },
            { CurrenciesTable.id }
        )
        join.select(AccountsTable.id eq id)
            .singleOrNull()
            ?.let {
                it.toAccount(it.toCurrency())
            }
    }

    override fun createAccount(
        name: String,
        currencyId: Long,
        baseValue: Double
    ): Account = transaction {
        val now = Clock.System.now()

        val row = AccountsTable.insert {
            it[AccountsTable.name] = name
            it[AccountsTable.currencyId] = currencyId
            it[AccountsTable.baseValue] = baseValue
            it[AccountsTable.createdAt] = now
        }

        getAccountById(row[AccountsTable.id])!!
    }

    override fun updateAccount(
        id: Long,
        name: String,
        currencyId: Long,
        baseValue: Double
    ): Account? = transaction {
        val updated = AccountsTable.update({ AccountsTable.id eq id }) {
            it[AccountsTable.name] = name
            it[AccountsTable.currencyId] = currencyId
            it[AccountsTable.baseValue] = baseValue
        }

        if (updated == 0) return@transaction null
        getAccountById(id)
    }

    override fun deleteAccount(id: Long): Boolean = transaction {
        AccountsTable.deleteWhere { AccountsTable.id eq id } > 0
    }
}