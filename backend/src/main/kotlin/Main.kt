import io.ktor.http.HttpStatusCode
import io.ktor.serialization.kotlinx.json.json
import io.ktor.server.application.Application
import io.ktor.server.application.install
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import io.ktor.server.plugins.contentnegotiation.ContentNegotiation
import io.ktor.server.plugins.openapi.openAPI
import io.ktor.server.plugins.requestvalidation.RequestValidation
import io.ktor.server.plugins.swagger.swaggerUI
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.route
import io.ktor.server.routing.routing
import model.MeasurementCategory
import repository.MeasurementCategoryRepository

fun main() {
    embeddedServer(Netty, 8080) {
        mainModule()
    }.start(wait = true)
}

fun Application.mainModule() {
    install(ContentNegotiation) {
        json()
    }

    routing {
        swaggerUI("openapi")
        openAPI("openapi")

        get("/api/user") {
            call.respond("Alma")
        }

        route("/api") {
            route("/measurement-categories") {
                val measurementCategoryRepository = MeasurementCategoryRepository()

                get {
                    call.respond(measurementCategoryRepository.getAll())
                }

                get("/{id}") {
                    val id = call.parameters["id"]!!
                    val measurementCategory = measurementCategoryRepository.get(id)

                    if (measurementCategory != null) {
                        call.respond(measurementCategory)
                    } else {
                        call.respond(HttpStatusCode.NotFound)
                    }
                }

                post {
                    val measurementCategory = call.receive<MeasurementCategory>()
                    measurementCategoryRepository.create(measurementCategory)
                    call.respond(HttpStatusCode.Created)
                }
            }
        }
    }

    install(RequestValidation) {

    }
}