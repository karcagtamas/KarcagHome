package modules.expenses.repository

import modules.expenses.data.Account

interface AccountRepository {

    fun getAccounts(): List<Account>
    fun getAccountById(id: Long): Account?
    fun createAccount(name: String, currencyId: Long, baseValue: Double = 0.0): Account
    fun updateAccount(id: Long, name: String, currencyId: Long, baseValue: Double): Account?
    fun deleteAccount(id: Long): Boolean

}