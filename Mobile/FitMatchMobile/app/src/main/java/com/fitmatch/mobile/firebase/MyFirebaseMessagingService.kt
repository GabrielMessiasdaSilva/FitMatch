package com.fitmatch.mobile.firebase

import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import android.util.Log

class MyFirebaseMessagingService : FirebaseMessagingService() {
    override fun onNewToken(token: String) {
        super.onNewToken(token)
        Log.d("FMS", "New token: $token")
    }
    override fun onMessageReceived(message: RemoteMessage) {
        super.onMessageReceived(message)
        Log.d("FMS", "Message: " + (message.notification?.body ?: message.data.toString()))
        // For full notifications, implement NotificationCompat here
    }
}
