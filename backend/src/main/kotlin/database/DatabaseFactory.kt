package database

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import config.DatabaseConfig
import org.jetbrains.exposed.v1.jdbc.Database

object DatabaseFactory {

    fun init(config: DatabaseConfig) {
        val hikariConfig = HikariConfig().apply {
            driverClassName = config.driver
            jdbcUrl = config.jdbcUrl
            username = config.user
            password = config.password
            maximumPoolSize = config.maximumPoolSize
            isAutoCommit = false
            transactionIsolation = "TRANSACTION_REPEATABLE_READ"
        }

        val dataSource = HikariDataSource(hikariConfig)

        FlywayFactory.migrate(dataSource)

        Database.connect(dataSource)
    }
}