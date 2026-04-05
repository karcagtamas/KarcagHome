package modules.expenses.routes

import core.idLong
import core.requireAndSend
import core.sendDeleted
import dto.expenses.ExpenseCategoryEditDTO
import dto.expenses.ExpenseEditDTO
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.delete
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.put
import io.ktor.server.routing.route
import modules.expenses.data.toDTO
import modules.expenses.repository.ExpenseRepository

fun Route.expensesRoutes(repository: ExpenseRepository) {

    route("/expense-categories") {

        get {
            call.respond(repository.getExpenses().map { it.toDTO() })
        }

        get("/{id}") {
            val id = call.idLong()

            call.requireAndSend(repository.getCategoryById(id)) { it.toDTO() }
        }

        post {
            val body = call.receive<ExpenseCategoryEditDTO>()
            call.respond(
                repository.createCategory(
                    body.name,
                    body.color,
                )
            )
        }

        put {
            val id = call.idLong()
            val body = call.receive<ExpenseCategoryEditDTO>()

            call.requireAndSend(repository.updateCategory(id, body.name, body.color)) { it.toDTO() }
        }

        delete("/{id}") {
            val id = call.idLong()

            call.sendDeleted(repository.deleteCategory(id))
        }
    }

    route("/expenses") {

        get {
            call.respond(repository.getExpenses().map { it.toDTO() })
        }

        get("/{id}") {
            val id = call.idLong()

            call.requireAndSend(repository.getExpenseById(id)) { it.toDTO() }
        }

        post {
            val body = call.receive<ExpenseEditDTO>()
            call.respond(
                repository.createExpense(
                    body.amount,
                    body.description,
                    body.categoryId,
                    body.date,
                )
            )
        }

        put {
            val id = call.idLong()
            val body = call.receive<ExpenseEditDTO>()

            call.requireAndSend(
                repository.updateExpense(
                    id,
                    body.amount,
                    body.description,
                    body.categoryId,
                    body.date,
                )
            ) { it.toDTO() }
        }

        delete("/{id}") {
            val id = call.idLong()

            call.sendDeleted(repository.deleteExpense(id))
        }
    }
}