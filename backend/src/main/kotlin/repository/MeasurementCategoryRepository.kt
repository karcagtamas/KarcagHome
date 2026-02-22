package repository

import com.mongodb.client.model.Filters.eq
import database.Mongo
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.toList
import model.MeasurementCategory
import org.bson.types.ObjectId

class MeasurementCategoryRepository {
    private val col = Mongo.db.getCollection<MeasurementCategory>("measurement_categories")

    suspend fun get(id: String) = col.find(eq("_id", ObjectId(id))).firstOrNull()

    suspend fun getAll() = col.find().toList()

    suspend fun create(measurementCategory: MeasurementCategory) = col.insertOne(measurementCategory)
}