package modules.expenses.routes

import core.idLong
import core.requireAndSend
import dto.expenses.CurrencyEditDTO
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.put
import io.ktor.server.routing.route
import modules.expenses.data.toDTO
import modules.expenses.repository.CurrencyRepository

fun Route.currencyRoutes(repository: CurrencyRepository) {

    route("/currencies") {
        get {
            call.respond(repository.getCurrencies().map { it.toDTO() })
        }

        get("/{id}") {
            val id = call.idLong()

            call.requireAndSend(repository.getCurrencyById(id)) { it.toDTO() }
        }

        post {
            val body = call.receive<CurrencyEditDTO>()

            call.respond(repository.createCurrency(body.name, body.abbreviation).toDTO())
        }

        put("/{id}") {
            val id = call.idLong()
            val body = call.receive<CurrencyEditDTO>()

            call.requireAndSend(repository.updateCurrency(id, body.name, body.abbreviation)) { it.toDTO() }
        }
    }
}