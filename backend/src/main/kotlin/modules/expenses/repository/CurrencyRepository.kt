package modules.expenses.repository

import modules.expenses.data.Currency
import modules.expenses.data.CurrencyMonthlyExchange

interface CurrencyRepository {

    fun getCurrencies(): List<Currency>
    fun getCurrencyById(id: Long): Currency?
    fun createCurrency(name: String, abbreviation: String): Currency
    fun updateCurrency(id: Long, name: String, abbreviation: String): Currency?

    fun getYearlyExchangeRates(year: Int): List<CurrencyMonthlyExchange>
}