package core

import io.ktor.http.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

suspend fun RoutingCall.idLong(): Long {
    val id = parameters["id"]?.toLongOrNull()

    if (id == null) {
        respond(HttpStatusCode.BadRequest)
        throw IllegalStateException("ID couldn't be found")
    }

    return id
}

suspend fun RoutingCall.idString(): String {
    val id = parameters["id"]

    if (id == null) {
        respond(HttpStatusCode.BadRequest)
        throw IllegalStateException("ID couldn't be found")
    }

    return id
}

suspend fun <T> RoutingCall.requireAndSend(value: T?) {
    value
        ?.let { respond(it) }
        ?: respond(HttpStatusCode.NotFound)
}

suspend fun RoutingCall.sendDeleted(isDeleted: Boolean) {
    if (isDeleted) {
        respond(HttpStatusCode.OK)
    } else {
        respond(HttpStatusCode.NotFound)
    }
}