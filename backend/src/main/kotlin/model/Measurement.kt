package model

import database.InstantAsBsonDateTime
import dto.MeasurementDTO
import kotlinx.serialization.Contextual
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.bson.types.ObjectId
import kotlin.time.Clock.System.now
import kotlin.time.Instant

@OptIn(ExperimentalSerializationApi::class)
@Serializable
data class Measurement(
    @SerialName("_id") @Contextual val id: ObjectId = ObjectId(),
    var value: Double,
    @Serializable(with = InstantAsBsonDateTime::class) val createdAt: Instant = now(),
    @Contextual var categoryId: ObjectId,
    var date: Instant,
) {
    fun toDTO(): MeasurementDTO {
        return MeasurementDTO(
            id.toHexString(),
            value,
            categoryId.toHexString(),
            date,
        )
    }

    fun updateByDTO(entity: MeasurementDTO) {
        value = entity.value
        categoryId = ObjectId(entity.categoryId)
        date = entity.date
    }
}