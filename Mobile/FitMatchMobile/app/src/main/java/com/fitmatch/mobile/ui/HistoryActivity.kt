package com.fitmatch.mobile.ui

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.fitmatch.mobile.R
import com.fitmatch.mobile.data.AvaliacaoAdapter
import com.fitmatch.mobile.model.Avaliacao
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

class HistoryActivity : AppCompatActivity() {

    private val db = FirebaseFirestore.getInstance()
    private val auth = FirebaseAuth.getInstance()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_history)

        val rv = findViewById<RecyclerView>(R.id.rv_history)
        rv.layoutManager = LinearLayoutManager(this)

        val adapter = AvaliacaoAdapter()
        rv.adapter = adapter

        val uid = auth.currentUser?.uid ?: return

        db.collection("avaliacoes")
            .whereEqualTo("jogadorId", uid)
            .orderBy("createdAt")
            .get()
            .addOnSuccessListener { result ->
                val list = result.documents.mapNotNull { it.toObject(Avaliacao::class.java) }
                adapter.submitList(list)
            }
            .addOnFailureListener { e ->
                Log.e("HISTORY", "Erro ao carregar histórico", e)
            }
    }
}
