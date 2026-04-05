package dto.expenses

import kotlinx.serialization.Serializable

@Serializable
data class ExpenseCategoryEditDTO(
    val name: String,
    val color: String,
)
