package dto.expenses

import kotlinx.serialization.Serializable

@Serializable
data class CurrencyEditDTO(
    val name: String,
    val abbreviation: String,
)
