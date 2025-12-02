package com.fitmatch.mobile.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

class AuthViewModel: ViewModel() {
    fun register(email: String, password: String, onResult: (Boolean) -> Unit) {
        viewModelScope.launch { onResult(true) }
    }
}