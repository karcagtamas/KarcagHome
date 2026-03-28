import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.CORS
import io.ktor.server.plugins.openapi.*
import io.ktor.server.plugins.requestvalidation.*
import io.ktor.server.plugins.swagger.*
import io.ktor.server.routing.*
import plugins.api
import plugins.configureCORS
import plugins.configureCompression
import plugins.configureDI
import plugins.configureDatabase
import plugins.configureLogging
import plugins.configureMonitoring
import plugins.configureRateLimit
import plugins.configureSecurity
import plugins.configureSerialization
import plugins.configureStatusPages
import plugins.configureValidation

fun main() {
    embeddedServer(Netty, 8080) {
        mainModule()
    }.start(wait = true)
}

fun Application.mainModule() {
    configureDI()
    configureDatabase()

    configureSerialization()
    configureLogging()
    configureStatusPages()
    configureCORS()
    configureSecurity()
    configureValidation()
    configureRateLimit()
    configureCompression()
    configureMonitoring()

    routing {
        swaggerUI("openapi")
        openAPI("openapi")

        api()
    }
}