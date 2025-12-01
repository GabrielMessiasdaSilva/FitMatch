package com.fitmatch.mobile.firebase

import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class FirebaseService : FirebaseMessagingService() {

    override fun onMessageReceived(msg: RemoteMessage) {
        println("Push recebido: ${msg.data}")
    }

    override fun onNewToken(token: String) {
        println("Novo token: $token")
    }
}
