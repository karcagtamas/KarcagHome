import react.create
import react.dom.client.createRoot
import web.dom.ElementId
import web.dom.document

fun main() {
    val container = document.getElementById(ElementId("root")) ?: error("Root container is missing")

    createRoot(container).render(App.create())
}