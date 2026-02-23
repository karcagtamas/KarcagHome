package repository

import com.mongodb.client.model.Filters.eq
import database.Mongo
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.toList
import model.Measurement
import org.bson.types.ObjectId

class MeasurementRepository {
    private val col = Mongo.db.getCollection<Measurement>("measurements")

    suspend fun get(id: String) = col.find(eq("_id", ObjectId(id))).firstOrNull()

    suspend fun getAll() = col.find().toList()

    suspend fun create(measurementCategory: Measurement) = col.insertOne(measurementCategory)

    suspend fun update(id: String, measurementCategory: Measurement) =
        col.replaceOne(eq("_id", id), measurementCategory)

    suspend fun delete(id: String) = col.deleteOne(eq("_id", id))
}