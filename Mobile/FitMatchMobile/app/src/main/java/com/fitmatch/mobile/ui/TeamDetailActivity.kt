package com.fitmatch.mobile.ui

import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.fitmatch.mobile.R
import com.fitmatch.mobile.model.Team
import com.google.firebase.firestore.FirebaseFirestore

class TeamDetailActivity : AppCompatActivity() {

    private val db = FirebaseFirestore.getInstance()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_team_detail)

        val tvTitle = findViewById<TextView>(R.id.tv_team_title)
        val tvDesc = findViewById<TextView>(R.id.tv_team_desc)
        val btnConfirm = findViewById<Button>(R.id.btn_confirm)

        val teamId = intent.getStringExtra("teamId")!!

        db.collection("times")
            .document(teamId)
            .get()
            .addOnSuccessListener { doc ->

                val team = doc.toObject(Team::class.java)

                team?.let {
                    tvTitle.text = it.nome
                    tvDesc.text = "Localização: ${it.localizacao}"
                }
            }
            .addOnFailureListener { e ->
                Log.e("FIRESTORE", "Erro ao carregar detalhamento do time", e)
            }

        btnConfirm.setOnClickListener {
            finish()
        }
    }
}
