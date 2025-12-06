package com.fitmatch.mobile.network

import com.fitmatch.mobile.model.Team
import com.fitmatch.mobile.model.Player
import retrofit2.Response
import retrofit2.http.*

interface ApiService {
    @GET("teams/nearby")
    suspend fun getNearby(): Response<List<Team>>

    @POST("teams/{id}/apply")
    suspend fun apply(@Path("id") id: String, @Body player: Player): Response<Unit>
}
