package com.fitmatch.mobile.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.fitmatch.mobile.ui.screens.HomeScreen
import com.fitmatch.mobile.ui.screens.LoginScreen
import com.fitmatch.mobile.ui.screens.RegisterScreen

sealed class Screen(val route: String) {
    object Login: Screen("login")
    object Register: Screen("register")
    object Home: Screen("home")
}

@Composable
fun AppNavHost() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = Screen.Login.route) {
        composable(Screen.Login.route) {
            LoginScreen(onLoginSuccess = { navController.navigate(Screen.Home.route) },
                onRegister = { navController.navigate(Screen.Register.route) })
        }
        composable(Screen.Register.route) {
            RegisterScreen(onRegisterSuccess = { navController.popBackStack(); navController.navigate(Screen.Home.route) })
        }
        composable(Screen.Home.route) {
            HomeScreen()
        }
    }
}