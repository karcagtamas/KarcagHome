package plugins

import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.server.application.Application
import io.ktor.server.application.install
import io.ktor.server.plugins.cors.routing.CORS

fun Application.configureCORS() {
    val corsConfig = environment.config.config("app.cors")

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