package model

import database.InstantAsBsonDateTime
import dto.MeasurementCategoryDTO
import kotlinx.serialization.Contextual
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.bson.types.ObjectId
import kotlin.time.Clock.System.now
import kotlin.time.Instant

@OptIn(ExperimentalSerializationApi::class)
@Serializable
data class MeasurementCategory(
    @SerialName("_id") @Contextual val id: ObjectId = ObjectId(),
    var name: String,
    @Serializable(with = InstantAsBsonDateTime::class) val createdAt: Instant = now(),
    var color: String,
    var unit: String,
) {

    fun toDTO(): MeasurementCategoryDTO {
        return MeasurementCategoryDTO(
            id.toHexString(),
            name,
            color,
            unit,
        )
    }

    fun updateByDTO(entity: MeasurementCategoryDTO) {
        name = entity.name
        color = entity.color
        unit = entity.unit
    }
}