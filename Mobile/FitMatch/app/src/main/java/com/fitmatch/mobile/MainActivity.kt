package com.fitmatch.mobile

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.Surface
import com.fitmatch.mobile.ui.navigation.AppNavHost
import com.fitmatch.mobile.ui.theme.FitMatchTheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            FitMatchTheme {
                Surface {
                    AppNavHost()
                }
            }
        }
    }
}