package com.fitmatch.mobile

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.fitmatch.mobile.ui.ProfileActivity
import com.fitmatch.mobile.ui.TeamsActivity
import com.fitmatch.mobile.ui.HistoryActivity

class HomeActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

        findViewById<Button>(R.id.btn_profile).setOnClickListener {
            startActivity(Intent(this, ProfileActivity::class.java))
        }
        findViewById<Button>(R.id.btn_teams).setOnClickListener {
            startActivity(Intent(this, TeamsActivity::class.java))
        }
        findViewById<Button>(R.id.btn_history).setOnClickListener {
            startActivity(Intent(this, HistoryActivity::class.java))
        }
    }
}

