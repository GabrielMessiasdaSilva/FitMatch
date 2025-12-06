package com.fitmatch.mobile.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "player")
data class Player(
    @PrimaryKey val id: String,
    val name: String,
    val age: Int?,
    val position: String?
)
