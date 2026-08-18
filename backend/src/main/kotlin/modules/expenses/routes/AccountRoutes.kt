package modules.expenses.routes

import core.idLong
import core.requireAndSend
import core.sendDeleted
import dto.expenses.AccountEditDTO
import dto.expenses.AccountSummaryCategoryDTO
import dto.expenses.AccountSummaryCategoryTypeDTO
import dto.expenses.AccountSummaryDTO
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.delete
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.put
import io.ktor.server.routing.route
import modules.expenses.data.toDTO
import modules.expenses.repository.AccountRepository
import modules.expenses.repository.ExpenseRepository

fun Route.accountRoutes(repository: AccountRepository, expenseRepository: ExpenseRepository) {
    route("/accounts") {

        get {
            call.respond(repository.getAccounts().map { it.toDTO() })
        }

        route("/{id}") {


            get {
                val id = call.idLong()

                call.requireAndSend(repository.getAccountById(id)) { it.toDTO() }
            }

            get("/summary") {
                val id = call.idLong()

                val expenses = expenseRepository.getExpenses(id)

                val total = expenses.sumOf { it.amount }
                val categories = expenses.groupBy { it.category }
                val categoryTypes = expenses.groupBy { it.category.type }

                val summary = AccountSummaryDTO(
                    total,
                    categories.map { (key, value) ->
                        val amount = value.sumOf { it.amount }
                        AccountSummaryCategoryDTO(key.toDTO(), amount)
                    },
                    categoryTypes.map { (key, value) ->
                        val amount = value.sumOf { it.amount }
                        AccountSummaryCategoryTypeDTO(key.toDTO(), amount)
                    },
                )

                call.respond(summary)
            }
        }

        post {
            val body = call.receive<AccountEditDTO>()

            call.respond(repository.createAccount(body.name, body.currencyId, body.baseValue).toDTO())
        }

        put("/{id}") {
            val id = call.idLong()
            val body = call.receive<AccountEditDTO>()

            call.requireAndSend(repository.updateAccount(id, body.name, body.currencyId, body.baseValue)) { it.toDTO() }
        }

        delete("/{id}") {
            val id = call.idLong()

            call.sendDeleted(repository.deleteAccount(id))
        }
    }
}