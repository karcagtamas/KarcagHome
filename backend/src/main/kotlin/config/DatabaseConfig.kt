package config

data class DatabaseConfig(
    val driver: String,
    val jdbcUrl: String,
    val user: String,
    val password: String,
    val maximumPoolSize: Int,
)
