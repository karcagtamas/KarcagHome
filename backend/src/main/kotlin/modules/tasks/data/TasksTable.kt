package modules.tasks.data

import org.jetbrains.exposed.v1.core.Table

object TasksTable : Table("tasks") {
    val id = long("id").autoIncrement()
    val title = varchar("title", 255)
    val description = varchar("description", 1000).nullable()
    val completed = bool("completed").default(false)

    override val primaryKey = PrimaryKey(id)
}