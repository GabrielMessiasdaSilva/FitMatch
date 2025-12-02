package com.fitmatch.mobile.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable

private val DarkColors = darkColorScheme(
    primary = AccentYellow,
    onPrimary = DarkBackground,
    background = DarkBackground,
    surface = CardBackground,
    onBackground = MutedText
)

@Composable
fun FitMatchTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = DarkColors,
        typography = androidx.compose.material3.Typography(),
        content = content
    )
}