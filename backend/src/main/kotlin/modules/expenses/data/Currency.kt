package modules.expenses.data

import kotlin.time.Instant

data class Currency(
    val id: Long,
    val name: String,
    val abbreviation: String,
    val createdAt: Instant,
)
