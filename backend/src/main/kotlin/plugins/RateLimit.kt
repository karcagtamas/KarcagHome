package plugins

import io.ktor.server.application.Application
import io.ktor.server.application.install
import io.ktor.server.plugins.ratelimit.RateLimit
import kotlin.time.Duration.Companion.seconds

fun Application.configureRateLimit() {
    val limit = environment.config.config("app.rateLimit")
        .property("requestsPerMinute")
        .getString()
        .toInt()

    install(RateLimit) {
        global {
            rateLimiter(limit, 60.seconds)
        }
    }
}