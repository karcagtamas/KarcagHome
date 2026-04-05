package modules.expenses.data

import kotlin.time.Instant

data class Account(
    val id: Long,
    val name: String,
    val currency: Currency,
    val baseValue: Double,
    val createdAt: Instant,
)
