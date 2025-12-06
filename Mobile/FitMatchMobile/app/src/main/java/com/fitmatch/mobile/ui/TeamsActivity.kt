package com.fitmatch.mobile.ui

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.fitmatch.mobile.R
import com.fitmatch.mobile.data.TeamAdapter
import com.fitmatch.mobile.model.Team
import com.google.firebase.firestore.FirebaseFirestore

class TeamsActivity : AppCompatActivity() {

    private val db = FirebaseFirestore.getInstance()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_teams)

        val rv = findViewById<RecyclerView>(R.id.rv_teams)
        rv.layoutManager = LinearLayoutManager(this)

        val adapter = TeamAdapter { id, name ->
            val i = Intent(this, TeamDetailActivity::class.java)
            i.putExtra("teamId", id)
            i.putExtra("teamName", name)
            startActivity(i)
        }

        rv.adapter = adapter

        db.collection("times")
            .get()
            .addOnSuccessListener { result ->
                val list = result.documents.mapNotNull { it.toObject(Team::class.java) }
                adapter.submitList(list)
            }
            .addOnFailureListener { e ->
                Log.e("FIRESTORE", "Erro ao carregar times", e)
            }
    }
}
