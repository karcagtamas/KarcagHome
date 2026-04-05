package dto.expenses

import kotlinx.serialization.Serializable

@Serializable
data class AccountDTO(
    val id: Long,
    val name: String,
    val currency: CurrencyDTO,
    val baseValue: Double,
)
