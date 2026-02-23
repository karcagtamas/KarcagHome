import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.openapi.*
import io.ktor.server.plugins.requestvalidation.*
import io.ktor.server.plugins.swagger.*
import io.ktor.server.routing.*
import plugin.api

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

        api()
    }

    install(RequestValidation) {

    }
}