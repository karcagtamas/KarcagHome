package database

import com.mongodb.kotlin.client.coroutine.MongoClient

object Mongo {
    private val client = MongoClient.create("mongodb://root:rootpass@localhost:27017")

    val db = client.getDatabase("khdb")
}