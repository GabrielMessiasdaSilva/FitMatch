package com.fitmatch.mobile.viewmodel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

class PlayerViewModel : ViewModel() {

    private val db = FirebaseFirestore.getInstance()
    private val auth = FirebaseAuth.getInstance()

    val player = MutableLiveData<Player?>()

    fun loadPlayerFromFirestore() {
        val uid = auth.currentUser?.uid ?: run { player.value = null; return }

        db.collection("jogadores")
            .document(uid)
            .get()
            .addOnSuccessListener { doc ->
                if (doc.exists()) {
                    val p = doc.toObject(Player::class.java)
                    player.value = p
                } else {
                    val newPlayer = Player(id = uid, usuarioId = uid)
                    db.collection("jogadores").document(uid).set(newPlayer)
                    player.value = newPlayer
                }
            }
            .addOnFailureListener {
                player.value = null
            }
    }

    fun savePlayerToFirestore(p: Player, onComplete: (() -> Unit)? = null) {
        db.collection("jogadores")
            .document(p.id)
            .set(p)
            .addOnSuccessListener { onComplete?.invoke() }
    }
}
