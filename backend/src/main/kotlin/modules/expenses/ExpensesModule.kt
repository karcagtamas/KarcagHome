package modules.expenses

import io.ktor.server.application.Application
import io.ktor.server.routing.Route
import modules.AppModule
import modules.expenses.repository.ExpenseRepository
import modules.expenses.repository.ExpenseRepositoryImpl
import modules.expenses.routes.expensesRoutes
import org.koin.core.module.Module
import org.koin.dsl.module
import org.koin.ktor.ext.inject

class ExpensesModule : AppModule {
    override fun Application.register() {}

    override fun Route.apiRoutes() {
        val repository by inject<ExpenseRepository>()

        expensesRoutes(repository)
    }

    override fun module(): Module = module {
        single<ExpenseRepository> { ExpenseRepositoryImpl() }
    }
}