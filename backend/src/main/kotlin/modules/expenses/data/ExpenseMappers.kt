package modules.expenses.data

import dto.expenses.AccountDTO
import dto.expenses.CurrencyDTO
import dto.expenses.ExpenseCategoryDTO
import dto.expenses.ExpenseDTO
import org.jetbrains.exposed.v1.core.ResultRow

fun ResultRow.toCurrency(): Currency = Currency(
    id = this[CurrenciesTable.id],
    name = this[CurrenciesTable.name],
    abbreviation = this[CurrenciesTable.abbreviation],
    createdAt = this[CurrenciesTable.createdAt],
    disabled = this[CurrenciesTable.disabled],
)

fun ResultRow.toExchange(currencyFrom: Currency, currencyTo: Currency): CurrencyMonthlyExchange =
    CurrencyMonthlyExchange(
        currencyFrom = currencyFrom,
        currencyTo = currencyTo,
        year = this[CurrencyMonthlyExchangesTable.year],
        month = this[CurrencyMonthlyExchangesTable.month],
        value = this[CurrencyMonthlyExchangesTable.value],
    )

fun ResultRow.toAccount(currency: Currency): Account = Account(
    id = this[AccountsTable.id],
    name = this[AccountsTable.name],
    currency = currency,
    baseValue = this[AccountsTable.baseValue],
    createdAt = this[AccountsTable.createdAt],
)

fun ResultRow.toCurrencyMonthlyExchange(currencyFrom: Currency, currencyTo: Currency): CurrencyMonthlyExchange =
    CurrencyMonthlyExchange(
        currencyFrom = currencyFrom,
        currencyTo = currencyTo,
        year = this[CurrencyMonthlyExchangesTable.year],
        month = this[CurrencyMonthlyExchangesTable.month],
        value = this[CurrencyMonthlyExchangesTable.value],
    )

fun ResultRow.toExpenseCategory(): ExpenseCategory = ExpenseCategory(
    id = this[ExpenseCategoriesTable.id],
    name = this[ExpenseCategoriesTable.name],
    color = this[ExpenseCategoriesTable.color],
    createdAt = this[ExpenseCategoriesTable.createdAt],
)

fun ResultRow.toExpense(category: ExpenseCategory, account: Account): Expense = Expense(
    id = this[ExpensesTable.id],
    amount = this[ExpensesTable.amount],
    description = this[ExpensesTable.description],
    date = this[ExpensesTable.date],
    createdAt = this[ExpensesTable.createdAt],
    category = category,
    account = account,
)

fun Currency.toDTO(): CurrencyDTO = CurrencyDTO(
    id = this.id,
    name = this.name,
    abbreviation = this.abbreviation,
    disabled = this.disabled,
)

fun Account.toDTO(): AccountDTO = AccountDTO(
    id = this.id,
    name = this.name,
    currency = this.currency.toDTO(),
    baseValue = this.baseValue,
)

fun ExpenseCategory.toDTO(): ExpenseCategoryDTO = ExpenseCategoryDTO(
    id = this.id,
    name = this.name,
    color = this.color,
)

fun Expense.toDTO(): ExpenseDTO = ExpenseDTO(
    id = this.id,
    amount = this.amount,
    description = this.description,
    date = this.date,
    category = this.category.toDTO(),
    account = this.account.toDTO(),
)