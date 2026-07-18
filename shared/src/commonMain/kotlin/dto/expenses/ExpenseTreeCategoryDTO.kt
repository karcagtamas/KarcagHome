package dto.expenses

import kotlinx.serialization.Serializable

@Serializable
data class ExpenseTreeCategoryDTO(val category: ExpenseCategoryDTO, val expenses: List<ExpenseDTO>)
