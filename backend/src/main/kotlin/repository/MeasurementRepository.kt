package repository

import com.mongodb.client.model.Filters.eq
import com.mongodb.client.result.InsertOneResult
import com.mongodb.client.result.UpdateResult
import database.Mongo
import dto.MeasurementDTO
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.toList
import model.Measurement
import org.bson.types.ObjectId
import kotlin.time.Clock.System.now

class MeasurementRepository {
    private val col = Mongo.db.getCollection<Measurement>("measurements")

    suspend fun get(id: String) = col.find(eq("_id", ObjectId(id))).firstOrNull()

    suspend fun getAll() = col.find().toList()

    suspend fun create(dto: MeasurementDTO): InsertOneResult {
        val measurement = Measurement(
            ObjectId(),
            dto.value,
            now(),
            ObjectId(dto.categoryId),
            dto.date,
        )
        return col.insertOne(measurement)
    }

    suspend fun update(id: String, dto: MeasurementDTO): UpdateResult {
        val measurement = get(id)!!
        measurement.updateByDTO(dto)
        return col.replaceOne(eq("_id", ObjectId(id)), measurement)
    }

    suspend fun delete(id: String) = col.deleteOne(eq("_id", ObjectId(id)))
}