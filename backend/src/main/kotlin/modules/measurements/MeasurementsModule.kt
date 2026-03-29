package modules.measurements

import io.ktor.server.application.*
import io.ktor.server.routing.*
import modules.AppModule
import modules.measurements.repository.MeasurementRepository
import modules.measurements.repository.MeasurementRepositoryImpl
import modules.measurements.routes.measurementRoutes
import org.koin.dsl.module
import org.koin.ktor.ext.inject

class MeasurementsModule : AppModule {

    override fun Application.register() {
        val repository by inject<MeasurementRepository>()

        routing {
            route("/api") {
                measurementRoutes(repository)
            }
        }
    }
}

val measurementsModule = module {
    single<MeasurementRepository> { MeasurementRepositoryImpl() }
}