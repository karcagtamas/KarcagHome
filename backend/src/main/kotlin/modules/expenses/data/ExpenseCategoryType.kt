package modules.expenses.data

import kotlin.time.Instant

data class ExpenseCategoryType(
    val id: Long,
    val name: String,
    val color: String,
    val createdAt: Instant,
)
