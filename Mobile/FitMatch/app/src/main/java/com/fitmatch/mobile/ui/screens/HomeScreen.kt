package com.fitmatch.mobile.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Card
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.fitmatch.mobile.ui.theme.CardBackground
import com.fitmatch.mobile.ui.theme.MutedText

@Composable
fun HomeScreen() {
    Box(modifier = Modifier
        .fillMaxSize()
        .background(CardBackground)
    ) {
        Column(modifier = Modifier
            .fillMaxWidth()
            .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Spacer(modifier = Modifier.height(24.dp))
            Text("FITMATCH")
            Text("O Tinder do Futebol: conecte jogadores e times!")
            Spacer(modifier = Modifier.height(12.dp))
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                FeatureCard(title = "Encontre jogadores", description = "Use filtros e encontre atletas")
                FeatureCard(title = "Dê match e convide", description = "Envie convites e monte seu time")
                FeatureCard(title = "Monte seu time", description = "Gerencie seu time e convide jogadores")
            }
        }
    }
}

@Composable
fun FeatureCard(title: String, description: String) {
    Card(modifier = Modifier
        .width(220.dp)
        .padding(8.dp)
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Text(title)
            Spacer(modifier = Modifier.height(8.dp))
            Text(description, color = MutedText)
        }
    }
}