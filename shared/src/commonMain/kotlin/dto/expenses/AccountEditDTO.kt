package dto.expenses

data class AccountEditDTO(
    val name: String,
    val currencyId: Long,
    val baseValue: Double,
)
