package com.fitmatch.mobile.ui

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import com.fitmatch.mobile.R
import com.fitmatch.mobile.viewmodel.Player
import com.fitmatch.mobile.viewmodel.PlayerViewModel
import com.google.firebase.auth.FirebaseAuth

class ProfileActivity : AppCompatActivity() {

    private val vm: PlayerViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        val etName = findViewById<EditText>(R.id.et_name)
        val etAge = findViewById<EditText>(R.id.et_age)
        val etPos = findViewById<EditText>(R.id.et_position)
        val etNeighborhood = findViewById<EditText>(R.id.et_neighborhood)
        val etNivel = findViewById<EditText>(R.id.et_nivel)
        val btnSave = findViewById<Button>(R.id.btn_save)

        vm.player.observe(this) { p ->
            p?.let {
                etName.setText(it.nome)
                etAge.setText(if (it.idade == 0) "" else it.idade.toString())
                etPos.setText(it.posicao)
                etNeighborhood.setText(it.neighborhood)
                etNivel.setText(it.nivel)
            }
        }

        vm.loadPlayerFromFirestore()

        btnSave.setOnClickListener {
            val uid = FirebaseAuth.getInstance().currentUser?.uid ?: return@setOnClickListener

            val player = Player(
                id = uid,
                usuarioId = uid,
                nome = etName.text.toString(),
                idade = etAge.text.toString().toIntOrNull() ?: 0,
                posicao = etPos.text.toString(),
                neighborhood = etNeighborhood.text.toString(),
                nivel = etNivel.text.toString(),
                rating = vm.player.value?.rating ?: 0
            )

            vm.savePlayerToFirestore(player) {
                finish()
            }
        }
    }
}
