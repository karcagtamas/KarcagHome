package dto.expenses

import kotlinx.serialization.Serializable

@Serializable
data class CurrencyTreeDTO(
    val currencyId: Long,
    val currencyName: String,
    val currencyAbbreviation: String,
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
