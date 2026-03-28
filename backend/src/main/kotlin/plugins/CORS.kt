package plugins

import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.server.application.Application
import io.ktor.server.application.install
import io.ktor.server.config.ApplicationConfig
import io.ktor.server.plugins.cors.routing.CORS
import org.koin.ktor.ext.get

fun Application.configureCORS() {
    val corsConfig = get<ApplicationConfig>().config("app.cors")

    install(CORS) {
        if (corsConfig.property("anyHost").getString().toBoolean()) {
            anyHost()
        }

        allowHeader(HttpHeaders.ContentType)
        HttpMethod.DefaultMethods.forEach {
            allowMethod(it)
        }
    }
}