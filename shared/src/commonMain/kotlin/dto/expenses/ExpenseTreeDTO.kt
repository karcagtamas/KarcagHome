package dto.expenses

import kotlinx.datetime.LocalDate
import kotlinx.serialization.Serializable

@Serializable
data class ExpenseTreeDTO(val date: LocalDate, val categories: List<ExpenseTreeCategoryDTO>)
