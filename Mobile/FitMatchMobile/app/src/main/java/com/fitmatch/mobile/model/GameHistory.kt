package com.fitmatch.mobile.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "game_history")
data class GameHistory(
    @PrimaryKey(autoGenerate = true) val uid: Int = 0,
    val teamName: String,
    val dateIso: String,
    val role: String,
    val attended: Boolean
)
