package dto.expenses

import kotlinx.serialization.Serializable

@Serializable
data class CurrencyTreeDTO(
    val data: CurrencyDTO,
    val months: List<MonthNode>
)

@Serializable
data class MonthNode(
    val month: Int,
    val rates: List<RateNode>,
)

@Serializable
data class RateNode(
    val currencyToId: Long,
    val currencyToName: String,
    val currencyToAbbreviation: String,
    val value: Double,
)
