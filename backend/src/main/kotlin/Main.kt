import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.openapi.*
import io.ktor.server.plugins.swagger.*
import io.ktor.server.routing.*
import modules.ModuleRegistry
import org.koin.ktor.ext.getKoin
import plugins.*

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

    val registry = getKoin().get<ModuleRegistry>()
    registry.registerAll(this)
}