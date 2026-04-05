package modules.expenses.data

data class CurrencyMonthlyExchange(
    val currencyFrom: Currency,
    val currencyTo: Currency,
    val year: Int,
    val month: Int,
    val value: Double,
)
