package modules.expenses.data

import kotlinx.datetime.LocalDate
import kotlin.time.Instant

data class Expense(
    val id: Long,
    val amount: Double,
    val description: String?,
    val date: LocalDate,
    val createdAt: Instant,
    val category: ExpenseCategory,
    val account: Account,
)
