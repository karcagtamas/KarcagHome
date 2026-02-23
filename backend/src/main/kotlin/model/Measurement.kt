package model

import kotlinx.serialization.Contextual
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.bson.codecs.kotlinx.InstantAsBsonDateTime
import org.bson.types.ObjectId
import kotlin.time.Clock.System.now
import kotlin.time.Instant

@OptIn(ExperimentalSerializationApi::class)
@Serializable
data class Measurement(
    @SerialName("_id") @Contextual val id: ObjectId = ObjectId(),
    val value: Double,
    @Serializable(with = InstantAsBsonDateTime::class) val createdAt: Instant = now(),
    @Contextual val categoryId: ObjectId,
    val date: Instant,
)