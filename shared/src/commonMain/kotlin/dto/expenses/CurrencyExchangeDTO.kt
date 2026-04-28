package dto.expenses

import kotlinx.serialization.Serializable

@Serializable
data class CurrencyExchangeDTO(
    val currencyFromId: Long,
    val currencyToId: Long,
    val year: Int,
    val month: Int,
    val value: Double,
)
