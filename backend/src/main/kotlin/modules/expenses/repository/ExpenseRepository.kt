package modules.expenses.repository

import kotlinx.datetime.LocalDate
import modules.expenses.data.Expense
import modules.expenses.data.ExpenseCategory

interface ExpenseRepository {

    fun getCategories(): List<ExpenseCategory>
    fun getCategoryById(id: Long): ExpenseCategory?
    fun createCategory(name: String, color: String): ExpenseCategory
    fun updateCategory(id: Long, name: String, color: String): ExpenseCategory?
    fun deleteCategory(id: Long): Boolean

    fun getExpenses(): List<Expense>
    fun getExpenseById(id: Long): Expense?
    fun createExpense(amount: Double, description: String?, categoryId: Long, date: LocalDate): Expense
    fun updateExpense(id: Long, amount: Double, description: String?, categoryId: Long, date: LocalDate): Expense?
    fun deleteExpense(id: Long): Boolean
}