package modules.expenses.repository

import kotlinx.datetime.LocalDate
import modules.expenses.data.*
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.core.innerJoin
import org.jetbrains.exposed.v1.jdbc.Query
import org.jetbrains.exposed.v1.jdbc.deleteWhere
import org.jetbrains.exposed.v1.jdbc.insert
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import org.jetbrains.exposed.v1.jdbc.update
import kotlin.time.Clock

class ExpenseRepositoryImpl : ExpenseRepository {

    override fun getCategoryTypes(): List<ExpenseCategoryType> = transaction {
        ExpenseCategoryTypesTable.selectAll().map { it.toExpenseCategoryType() }
    }

    override fun getCategoryTypeById(id: Long): ExpenseCategoryType? = transaction {
        ExpenseCategoryTypesTable.selectAll()
            .where { ExpenseCategoryTypesTable.id eq id }
            .singleOrNull()
            ?.toExpenseCategoryType()
    }

    override fun getCategories(): List<ExpenseCategory> = transaction {
        ExpenseCategoriesTable.fullQuery()
            .map {
                it.toExpenseCategory(it.toExpenseCategoryType())
            }
    }

    override fun getCategoryById(id: Long): ExpenseCategory? = transaction {
        ExpenseCategoriesTable.fullQuery()
            .where { ExpenseCategoriesTable.id eq id }
            .singleOrNull()
            ?.let {
                it.toExpenseCategory(it.toExpenseCategoryType())
            }
    }

    override fun createCategory(name: String, color: String, typeId: Long): ExpenseCategory = transaction {
        val now = Clock.System.now()

        val row = ExpenseCategoriesTable.insert {
            it[ExpenseCategoriesTable.name] = name
            it[ExpenseCategoriesTable.color] = color
            it[ExpenseCategoriesTable.typeId] = typeId
            it[createdAt] = now
        }

        getCategoryById(row[ExpenseCategoriesTable.id])!!
    }

    override fun updateCategory(
        id: Long,
        name: String,
        color: String,
        typeId: Long,
    ): ExpenseCategory? = transaction {
        val updated = ExpenseCategoriesTable.update({ ExpenseCategoriesTable.id eq id }) {
            it[ExpenseCategoriesTable.name] = name
            it[ExpenseCategoriesTable.color] = color
            it[ExpenseCategoriesTable.typeId] = typeId
        }

        if (updated == 0) return@transaction null
        getCategoryById(id)
    }

    override fun deleteCategory(id: Long): Boolean = transaction {
        ExpenseCategoriesTable.deleteWhere { ExpenseCategoriesTable.id eq id } > 0
    }

    override fun getExpenses(): List<Expense> = transaction {
        ExpensesTable.fullQuery()
            .map {
                val category = it.toExpenseCategory(it.toExpenseCategoryType())
                val currency = it.toCurrency()
                val account = it.toAccount(currency)
                it.toExpense(category, account)
            }
    }

    override fun getExpenseById(id: Long): Expense? = transaction {
        ExpensesTable.fullQuery()
            .where { ExpenseCategoriesTable.id eq id }
            .singleOrNull()
            ?.let {
                val category = it.toExpenseCategory(it.toExpenseCategoryType())
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

    private fun ExpensesTable.fullQuery(): Query {
        return this
            .innerJoin(
                ExpenseCategoriesTable,
                { ExpensesTable.categoryId },
                { ExpenseCategoriesTable.id },
            )
            .innerJoin(
                ExpenseCategoryTypesTable,
                { ExpenseCategoriesTable.typeId eq ExpensesTable.id },
                { ExpenseCategoryTypesTable.id eq ExpensesTable.id },
            )
            .innerJoin(
                AccountsTable,
                { ExpensesTable.accountId },
                { AccountsTable.id }
            )
            .innerJoin(
                CurrenciesTable,
                { AccountsTable.currencyId },
                { CurrenciesTable.id }
            )
            .selectAll()
    }

    private fun ExpenseCategoriesTable.fullQuery(): Query {
        return this
            .innerJoin(
                ExpenseCategoryTypesTable,
                { ExpenseCategoriesTable.typeId eq id },
                { ExpenseCategoryTypesTable.id eq id }
            )
            .selectAll()
    }
}