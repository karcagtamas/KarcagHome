package modules.expenses.routes

import core.idLong
import core.requireAndSend
import dto.expenses.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import modules.expenses.data.CurrenciesTable
import modules.expenses.data.CurrencyMonthlyExchangesTable
import modules.expenses.data.toDTO
import modules.expenses.repository.CurrencyRepository
import org.jetbrains.exposed.v1.core.JoinType
import org.jetbrains.exposed.v1.core.alias
import org.jetbrains.exposed.v1.core.and
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.jdbc.andWhere
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
            val showDisabled = call.queryParameters["showDisabled"]?.toBoolean() ?: false
            val tree = transaction {
                val from = CurrenciesTable.alias("from")
                val to = CurrenciesTable.alias("to")

                val currencies = CurrenciesTable
                    .selectAll()
                    .let {
                        if (!showDisabled) {
                            it.where { CurrenciesTable.disabled eq false }
                        } else {
                            it
                        }
                    }
                    .toList()

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
                    .let {
                        if (!showDisabled) {
                            it.andWhere { (from[CurrenciesTable.disabled] eq false) and (to[CurrenciesTable.disabled] eq false) }
                        } else {
                            it
                        }
                    }
                    .toList()

                val grouped = rows.groupBy { it[CurrencyMonthlyExchangesTable.currencyFromId] }

                currencies.map { currencyRow ->
                    val currencyId = currencyRow[CurrenciesTable.id]
                    val currencyName = currencyRow[CurrenciesTable.name]
                    val currencyAbbreviation = currencyRow[CurrenciesTable.abbreviation]
                    val currencyDisabled = currencyRow[CurrenciesTable.disabled]

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
                        data = CurrencyDTO(
                            currencyId,
                            currencyName,
                            currencyAbbreviation,
                            currencyDisabled,
                        ),
                        months = months,
                    )
                }
            }
            call.respond(tree)
        }
    }
}