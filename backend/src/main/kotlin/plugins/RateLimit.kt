package plugins

import io.ktor.server.application.Application
import io.ktor.server.application.install
import io.ktor.server.config.ApplicationConfig
import io.ktor.server.plugins.ratelimit.RateLimit
import org.koin.ktor.ext.get
import kotlin.time.Duration.Companion.seconds

fun Application.configureRateLimit() {
    val limit = get<ApplicationConfig>().config("app.rateLimit")
        .property("requestsPerMinute")
        .getString()
        .toInt()

    install(RateLimit) {
        global {
            rateLimiter(limit, 60.seconds)
        }
    }
}