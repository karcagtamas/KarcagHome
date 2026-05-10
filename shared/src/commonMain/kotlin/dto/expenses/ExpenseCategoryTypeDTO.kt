package dto.expenses

import kotlinx.serialization.Serializable

@Serializable
data class ExpenseCategoryTypeDTO(
    val id: Long,
    val name: String,
)
