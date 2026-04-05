package dto.expenses

import kotlinx.datetime.LocalDate
import kotlinx.serialization.Serializable

@Serializable
data class ExpenseDTO(
    val id: Long,
    val amount: Double,
    val description: String?,
    val date: LocalDate,
    val category: ExpenseCategoryDTO,
    val account: AccountDTO,
)
