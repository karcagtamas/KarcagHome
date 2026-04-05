package dto.expenses

import kotlinx.serialization.Serializable

@Serializable
data class CurrencyDTO(
    val id: Long,
    val name: String,
    val abbreviation: String,
)
