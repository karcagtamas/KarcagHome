package dto.expenses

import kotlinx.serialization.Serializable

@Serializable
data class ExpenseCategoryDTO(
    val id: Long,
    val name: String,
    val color: String,
)
