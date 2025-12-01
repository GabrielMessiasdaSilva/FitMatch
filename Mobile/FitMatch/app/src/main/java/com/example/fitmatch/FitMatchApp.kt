package com.fitmatch.mobile

import android.app.Application
import com.google.firebase.FirebaseApp

class FitMatchApp : Application() {
    override fun onCreate() {
        super.onCreate()
        FirebaseApp.initializeApp(this)
    }
}