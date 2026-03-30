package modules.measurements

import io.ktor.server.application.*
import io.ktor.server.routing.*
import modules.AppModule
import modules.measurements.repository.MeasurementRepository
import modules.measurements.repository.MeasurementRepositoryImpl
import modules.measurements.routes.measurementRoutes
import org.koin.core.module.Module
import org.koin.dsl.module
import org.koin.ktor.ext.inject

class MeasurementsModule : AppModule {

    override fun Application.register() {}

    override fun Route.apiRoutes() {
        val repository by inject<MeasurementRepository>()

        measurementRoutes(repository)
    }

    override fun module(): Module = module {
        single<MeasurementRepository> { MeasurementRepositoryImpl() }
    }
}