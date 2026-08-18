package modules.tasks.data

import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.datetime.date

object TasksTable : Table("tasks") {
    val id = long("id").autoIncrement()
    val title = varchar("title", 255)
    val description = varchar("description", 1000).nullable()
    val completed = bool("completed").default(false)
    val importance = integer("importance").default(0)
    val dueDate = date("due_date").nullable()

    override val primaryKey = PrimaryKey(id)
}