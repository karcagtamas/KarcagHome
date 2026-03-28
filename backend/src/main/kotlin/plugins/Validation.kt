package plugins

import io.ktor.server.application.Application
import io.ktor.server.application.install
import io.ktor.server.plugins.requestvalidation.RequestValidation
import io.ktor.server.plugins.requestvalidation.ValidationResult

fun Application.configureValidation() {
    install(RequestValidation) {
        validate<String> { body ->
            if (body.isBlank()) {
                ValidationResult.Invalid("Body cannot be blank")
            } else {
                ValidationResult.Valid
            }
        }
    }
}