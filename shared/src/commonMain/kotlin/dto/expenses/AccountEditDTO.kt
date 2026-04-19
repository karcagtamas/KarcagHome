package dto.expenses

import kotlinx.serialization.Serializable

@Serializable
data class AccountEditDTO(
    val name: String,
    val currencyId: Long,
    val baseValue: Double,
)
