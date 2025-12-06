package com.fitmatch.mobile.network;

import com.fitmatch.mobile.model.Team;
import com.fitmatch.mobile.model.Player;
import retrofit2.Response;
import retrofit2.http.*;

@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000.\n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0000\n\u0002\u0018\u0002\n\u0002\u0010\u0002\n\u0000\n\u0002\u0010\u000e\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0010 \n\u0002\u0018\u0002\n\u0002\b\u0002\bf\u0018\u00002\u00020\u0001J(\u0010\u0002\u001a\b\u0012\u0004\u0012\u00020\u00040\u00032\b\b\u0001\u0010\u0005\u001a\u00020\u00062\b\b\u0001\u0010\u0007\u001a\u00020\bH\u00a7@\u00a2\u0006\u0002\u0010\tJ\u001a\u0010\n\u001a\u000e\u0012\n\u0012\b\u0012\u0004\u0012\u00020\f0\u000b0\u0003H\u00a7@\u00a2\u0006\u0002\u0010\r\u00a8\u0006\u000e"}, d2 = {"Lcom/fitmatch/mobile/network/ApiService;", "", "apply", "Lretrofit2/Response;", "", "id", "", "player", "Lcom/fitmatch/mobile/model/Player;", "(Ljava/lang/String;Lcom/fitmatch/mobile/model/Player;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "getNearby", "", "Lcom/fitmatch/mobile/model/Team;", "(Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "app_debug"})
public abstract interface ApiService {
    
    @retrofit2.http.GET(value = "teams/nearby")
    @org.jetbrains.annotations.Nullable()
    public abstract java.lang.Object getNearby(@org.jetbrains.annotations.NotNull()
    kotlin.coroutines.Continuation<? super retrofit2.Response<java.util.List<com.fitmatch.mobile.model.Team>>> $completion);
    
    @retrofit2.http.POST(value = "teams/{id}/apply")
    @org.jetbrains.annotations.Nullable()
    public abstract java.lang.Object apply(@retrofit2.http.Path(value = "id")
    @org.jetbrains.annotations.NotNull()
    java.lang.String id, @retrofit2.http.Body()
    @org.jetbrains.annotations.NotNull()
    com.fitmatch.mobile.model.Player player, @org.jetbrains.annotations.NotNull()
    kotlin.coroutines.Continuation<? super retrofit2.Response<kotlin.Unit>> $completion);
}