package com.fitmatch.mobile.ui

import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.TextView
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
        val tvEmpty = findViewById<TextView>(R.id.tv_empty)

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

                if (list.isEmpty()) {
                    tvEmpty.visibility = View.VISIBLE
                    rv.visibility = View.GONE
                } else {
                    tvEmpty.visibility = View.GONE
                    rv.visibility = View.VISIBLE
                    adapter.submitList(list)
                }
            }
            .addOnFailureListener { e ->
                Log.e("HISTORY", "Erro ao carregar dados.", e)
                tvEmpty.visibility = View.VISIBLE
                tvEmpty.text = "Não há avaliações de partida no momento ⚽"
            }
    }
}
