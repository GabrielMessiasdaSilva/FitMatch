package com.fitmatch.mobile.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.unit.dp
import com.fitmatch.mobile.ui.theme.CardBackground

@Composable
fun RegisterScreen(onRegisterSuccess: () -> Unit = {}) {
    var name by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    Box(modifier = Modifier
        .fillMaxSize()
        .background(CardBackground),
        contentAlignment = Alignment.Center
    ) {
        Column(modifier = Modifier
            .fillMaxWidth(0.9f)
            .shadow(8.dp, RoundedCornerShape(12.dp))
            .background(CardBackground)
            .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text("Criar conta", modifier=Modifier.padding(bottom=12.dp))
            OutlinedTextField(value = name, onValueChange = { name = it }, label = { Text("Nome") })
            Spacer(modifier = Modifier.height(8.dp))
            OutlinedTextField(value = email, onValueChange = { email = it }, label = { Text("Email") })
            Spacer(modifier = Modifier.height(8.dp))
            OutlinedTextField(value = password, onValueChange = { password = it }, label = { Text("Senha") })
            Spacer(modifier = Modifier.height(16.dp))
            Button(onClick = { onRegisterSuccess() }, modifier = Modifier.fillMaxWidth()) { Text("Cadastrar") }
        }
    }
}