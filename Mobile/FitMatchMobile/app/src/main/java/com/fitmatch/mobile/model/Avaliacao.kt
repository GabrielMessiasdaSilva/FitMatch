package com.fitmatch.mobile.model

data class Avaliacao(
    val id: String = "",
    val jogadorId: String = "",
    val jogoId: String = "",
    val nota: String = "",
    val comentario: String = "",
    val createdAt: Long = 0
)
