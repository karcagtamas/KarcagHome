package modules.expenses.routes

import core.idLong
import core.requireAndSend
import core.sendDeleted
import dto.expenses.AccountEditDTO
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

fun Route.accountRoutes(repository: AccountRepository) {
    route("/accounts") {

        get {
            call.respond(repository.getAccounts().map { it.toDTO() })
        }

        get("/{id}") {
            val id = call.idLong()

            call.requireAndSend(repository.getAccountById(id)) { it.toDTO() }
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