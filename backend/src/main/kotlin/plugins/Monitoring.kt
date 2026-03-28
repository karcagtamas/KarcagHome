package plugins

import io.ktor.server.application.Application
import io.ktor.server.application.ApplicationCallPipeline
import io.ktor.server.application.call
import io.ktor.server.application.log

fun Application.configureMonitoring() {
    intercept(ApplicationCallPipeline.Monitoring) {
        val start = System.currentTimeMillis()

        proceed()

        val duration = System.currentTimeMillis() - start
        call.application.log.info("Request took ${duration}ms")
    }
}