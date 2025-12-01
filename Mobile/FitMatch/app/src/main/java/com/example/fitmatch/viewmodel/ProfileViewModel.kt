package com.fitmatch.mobile.ui.profile

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.google.firebase.firestore.FirebaseFirestore

data class PlayerProfile(
    val name: String = "",
    val age: Int = 0,
    val position: String = ""
)

class ProfileViewModel : ViewModel() {

    private val db = FirebaseFirestore.getInstance()

    private val _profile = MutableLiveData<PlayerProfile>()
    val profile: LiveData<PlayerProfile> = _profile

    fun loadUserProfile() {
        // Aqui você troca pelo ID real do jogador logado
        val userId = "USER_ID_FIXO"

        db.collection("players")
            .document(userId)
            .get()
            .addOnSuccessListener { snap ->
                val user = snap.toObject(PlayerProfile::class.java)
                if (user != null) {
                    _profile.value = user
                }
            }
    }
}
