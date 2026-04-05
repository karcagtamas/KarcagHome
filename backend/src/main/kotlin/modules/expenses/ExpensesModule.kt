package modules.expenses

import io.ktor.server.application.Application
import io.ktor.server.routing.Route
import modules.AppModule
import modules.expenses.repository.AccountRepository
import modules.expenses.repository.AccountRepositoryImpl
import modules.expenses.repository.CurrencyRepository
import modules.expenses.repository.CurrencyRepositoryImpl
import modules.expenses.repository.ExpenseRepository
import modules.expenses.repository.ExpenseRepositoryImpl
import modules.expenses.routes.accountRoutes
import modules.expenses.routes.currencyRoutes
import modules.expenses.routes.expensesRoutes
import org.koin.core.module.Module
import org.koin.dsl.module
import org.koin.ktor.ext.inject

class ExpensesModule : AppModule {
    override fun Application.register() {}

    override fun Route.apiRoutes() {
        val expenseRepository by inject<ExpenseRepository>()
        val currencyRepository by inject<CurrencyRepository>()
        val accountRepository by inject<AccountRepository>()

        expensesRoutes(expenseRepository)
        accountRoutes(accountRepository)
        currencyRoutes(currencyRepository)
    }

    override fun module(): Module = module {
        single<ExpenseRepository> { ExpenseRepositoryImpl() }
        single<AccountRepository> { AccountRepositoryImpl() }
        single<CurrencyRepository> { CurrencyRepositoryImpl() }
    }
}