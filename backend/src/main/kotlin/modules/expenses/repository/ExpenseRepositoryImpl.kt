package modules.expenses.repository

import kotlinx.datetime.LocalDate
import modules.expenses.data.AccountsTable
import modules.expenses.data.CurrenciesTable
import modules.expenses.data.Expense
import modules.expenses.data.ExpenseCategoriesTable
import modules.expenses.data.ExpenseCategory
import modules.expenses.data.ExpensesTable
import modules.expenses.data.toAccount
import modules.expenses.data.toCurrency
import modules.expenses.data.toExpense
import modules.expenses.data.toExpenseCategory
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.core.innerJoin
import org.jetbrains.exposed.v1.jdbc.deleteWhere
import org.jetbrains.exposed.v1.jdbc.insert
import org.jetbrains.exposed.v1.jdbc.select
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import org.jetbrains.exposed.v1.jdbc.update
import kotlin.time.Clock

class ExpenseRepositoryImpl : ExpenseRepository {

    override fun getCategories(): List<ExpenseCategory> = transaction {
        ExpenseCategoriesTable.selectAll().map { it.toExpenseCategory() }
    }

    override fun getCategoryById(id: Long): ExpenseCategory? = transaction {
        ExpenseCategoriesTable.select(ExpenseCategoriesTable.id eq id)
            .singleOrNull()
            ?.toExpenseCategory()
    }

    override fun createCategory(name: String, color: String): ExpenseCategory = transaction {
        val now = Clock.System.now()

        val row = ExpenseCategoriesTable.insert {
            it[ExpenseCategoriesTable.name] = name
            it[ExpenseCategoriesTable.color] = color
            it[createdAt] = now
        }

        ExpenseCategory(
            row[ExpenseCategoriesTable.id],
            name,
            color,
            now,
        )
    }

    override fun updateCategory(
        id: Long,
        name: String,
        color: String
    ): ExpenseCategory? = transaction {
        val updated = ExpenseCategoriesTable.update({ ExpenseCategoriesTable.id eq id }) {
            it[ExpenseCategoriesTable.name] = name
            it[ExpenseCategoriesTable.color] = color
        }

        if (updated == 0) return@transaction null
        getCategoryById(id)
    }

    override fun deleteCategory(id: Long): Boolean = transaction {
        ExpenseCategoriesTable.deleteWhere { ExpenseCategoriesTable.id eq id } > 0
    }

    override fun getExpenses(): List<Expense> = transaction {
        val join = ExpensesTable.innerJoin(
            ExpenseCategoriesTable,
            { ExpensesTable.categoryId },
            { ExpenseCategoriesTable.id },
        ).innerJoin(
            AccountsTable,
            { ExpensesTable.accountId },
            { AccountsTable.id }
        ).innerJoin(
            CurrenciesTable,
            { AccountsTable.currencyId },
            { CurrenciesTable.id }
        )

        join.selectAll().map {
            val category = it.toExpenseCategory()
            val currency = it.toCurrency()
            val account = it.toAccount(currency)
            it.toExpense(category, account)
        }
    }

    override fun getExpenseById(id: Long): Expense? = transaction {
        val join = ExpensesTable.innerJoin(
            ExpenseCategoriesTable,
            { ExpensesTable.categoryId },
            { ExpenseCategoriesTable.id },
        ).innerJoin(
            AccountsTable,
            { ExpensesTable.accountId },
            { AccountsTable.id }
        ).innerJoin(
            CurrenciesTable,
            { AccountsTable.currencyId },
            { CurrenciesTable.id }
        )

        join
            .select(ExpenseCategoriesTable.id eq id)
            .singleOrNull()
            ?.let {
                val category = it.toExpenseCategory()
                val currency = it.toCurrency()
                val account = it.toAccount(currency)
                it.toExpense(category, account)
            }
    }

    override fun createExpense(
        amount: Double,
        description: String?,
        categoryId: Long,
        date: LocalDate
    ): Expense = transaction {
        val now = Clock.System.now()

        val row = ExpensesTable.insert {
            it[ExpensesTable.amount] = amount
            it[ExpensesTable.description] = description
            it[ExpensesTable.categoryId] = categoryId
            it[ExpensesTable.date] = date
            it[createdAt] = now
        }

        getExpenseById(row[ExpenseCategoriesTable.id])!!
    }

    override fun updateExpense(
        id: Long,
        amount: Double,
        description: String?,
        categoryId: Long,
        date: LocalDate
    ): Expense? = transaction {
        val updated = ExpenseCategoriesTable.update({ ExpenseCategoriesTable.id eq id }) {
            it[ExpensesTable.amount] = amount
            it[ExpensesTable.description] = description
            it[ExpensesTable.categoryId] = categoryId
            it[ExpensesTable.date] = date
        }

        if (updated == 0) return@transaction null
        getExpenseById(id)
    }

    override fun deleteExpense(id: Long): Boolean = transaction {
        ExpensesTable.deleteWhere { ExpensesTable.id eq id } > 0
    }
}