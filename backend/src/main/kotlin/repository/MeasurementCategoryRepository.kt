package repository

import com.mongodb.client.model.Filters.eq
import com.mongodb.client.result.InsertOneResult
import com.mongodb.client.result.UpdateResult
import database.Mongo
import dto.MeasurementCategoryDTO
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.toList
import model.MeasurementCategory
import org.bson.types.ObjectId
import kotlin.time.Clock.System.now

class MeasurementCategoryRepository {
    private val col = Mongo.db.getCollection<MeasurementCategory>("measurement_categories")

    suspend fun get(id: String) = col.find(eq("_id", ObjectId(id))).firstOrNull()

    suspend fun getAll() = col.find().toList()

    suspend fun create(dto: MeasurementCategoryDTO): InsertOneResult {
        val measurementCategory = MeasurementCategory(
            ObjectId(),
            dto.name,
            now(),
            dto.color,
            dto.unit,
        )
        return col.insertOne(measurementCategory)
    }

    suspend fun update(id: String, dto: MeasurementCategoryDTO): UpdateResult {
        val measurementCategory = get(id)!!
        measurementCategory.updateByDTO(dto)
        return col.replaceOne(eq("_id", ObjectId(id)), measurementCategory)
    }

    suspend fun delete(id: String) = col.deleteOne(eq("_id", ObjectId(id)))
}