package modules.expenses.routes

import core.idLong
import core.requireAndSend
import dto.expenses.CurrencyEditDTO
import dto.expenses.CurrencyTreeDTO
import dto.expenses.MonthNode
import dto.expenses.RateNode
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import modules.expenses.data.CurrenciesTable
import modules.expenses.data.CurrencyMonthlyExchangesTable
import modules.expenses.data.toDTO
import modules.expenses.repository.CurrencyRepository
import org.jetbrains.exposed.v1.core.JoinType
import org.jetbrains.exposed.v1.core.alias
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction

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

        get("/tree") {
            val year = call.queryParameters["year"]?.toIntOrNull() ?: 0
            val tree = transaction {
                val from = CurrenciesTable.alias("from")
                val to = CurrenciesTable.alias("to")

                val currencies = CurrenciesTable.selectAll().toList()

                val currencyMap = currencies.associateBy { it[CurrenciesTable.id] }

                val rows = CurrencyMonthlyExchangesTable
                    .join(from, JoinType.INNER) {
                        CurrencyMonthlyExchangesTable.currencyFromId eq from[CurrenciesTable.id]
                    }
                    .join(to, JoinType.INNER) {
                        CurrencyMonthlyExchangesTable.currencyToId eq to[CurrenciesTable.id]
                    }
                    .selectAll()
                    .where { CurrencyMonthlyExchangesTable.year eq year }
                    .toList()

                val grouped = rows.groupBy { it[CurrencyMonthlyExchangesTable.currencyFromId] }

                currencies.map { currencyRow ->
                    val currencyId = currencyRow[CurrenciesTable.id]
                    val currencyName = currencyRow[CurrenciesTable.name]
                    val currencyAbbreviation = currencyRow[CurrenciesTable.abbreviation]

                    val currencyRows = grouped[currencyId].orEmpty()

                    val months = currencyRows
                        .groupBy { it[CurrencyMonthlyExchangesTable.month] }
                        .map { (month, monthRows) ->
                            MonthNode(
                                month = month,
                                rates = monthRows.map { row ->
                                    RateNode(
                                        currencyToId = row[CurrencyMonthlyExchangesTable.currencyToId],
                                        currencyToName = currencyMap[row[CurrencyMonthlyExchangesTable.currencyToId]]
                                            ?.get(CurrenciesTable.name)
                                            ?: "Unknown",
                                        currencyToAbbreviation = currencyMap[row[CurrencyMonthlyExchangesTable.currencyToId]]
                                            ?.get(CurrenciesTable.abbreviation)
                                            ?: "Unknown",
                                        value = row[CurrencyMonthlyExchangesTable.value],
                                    )
                                }
                            )
                        }
                        .sortedBy { it.month }

                    CurrencyTreeDTO(
                        currencyId = currencyId,
                        currencyName = currencyName,
                        currencyAbbreviation = currencyAbbreviation,
                        months = months,
                    )
                }
            }
            call.respond(tree)
        }
    }
}