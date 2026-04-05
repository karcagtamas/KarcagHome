package dto.expenses

import kotlinx.datetime.LocalDate
import kotlinx.serialization.Serializable

@Serializable
data class ExpenseEditDTO(
    val amount: Double,
    val description: String?,
    val date: LocalDate,
    val categoryId: Long,
)
