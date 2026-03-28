package database

import org.flywaydb.core.Flyway
import javax.sql.DataSource

object FlywayFactory {

    fun migrate(dataSource: DataSource) {
        val flyway = Flyway.configure()
            .dataSource(dataSource)
            .locations("classpath:db/migration")
            .baselineOnMigrate(true)
            .load()

        flyway.migrate()
    }
}