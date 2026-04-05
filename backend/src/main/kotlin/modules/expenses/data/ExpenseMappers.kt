package modules.expenses.data

import dto.expenses.ExpenseCategoryDTO
import dto.expenses.ExpenseDTO
import org.jetbrains.exposed.v1.core.ResultRow

fun ResultRow.toExpenseCategory(): ExpenseCategory = ExpenseCategory(
    id = this[ExpenseCategoriesTable.id],
    name = this[ExpenseCategoriesTable.name],
    color = this[ExpenseCategoriesTable.color],
    createdAt = this[ExpenseCategoriesTable.createdAt],
)

fun ResultRow.toExpense(category: ExpenseCategory): Expense = Expense(
    id = this[ExpensesTable.id],
    amount = this[ExpensesTable.amount],
    description = this[ExpensesTable.description],
    date = this[ExpensesTable.date],
    createdAt = this[ExpensesTable.createdAt],
    category = category,
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
)