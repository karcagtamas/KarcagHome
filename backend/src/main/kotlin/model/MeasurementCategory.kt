package model

import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId

data class MeasurementCategory(
    @field:BsonId val id: ObjectId = ObjectId(),
    val name: String
)