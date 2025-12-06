package com.fitmatch.mobile.data

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.fitmatch.mobile.R
import com.fitmatch.mobile.model.Team

class TeamAdapter(
    private val onClick: (String, String) -> Unit
) : RecyclerView.Adapter<TeamAdapter.TeamViewHolder>() {

    private var list: List<Team> = emptyList()

    fun submitList(newList: List<Team>) {
        list = newList
        notifyDataSetChanged()
    }

    class TeamViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val title: TextView = view.findViewById(R.id.tv_team_title_item)
        val desc: TextView = view.findViewById(R.id.tv_team_desc_item)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TeamViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_team, parent, false)
        return TeamViewHolder(view)
    }

    override fun getItemCount(): Int = list.size

    override fun onBindViewHolder(holder: TeamViewHolder, position: Int) {
        val item = list[position]

        holder.title.text = item.nome
        holder.desc.text = item.localizacao

        holder.itemView.setOnClickListener {
            onClick(item.id, item.nome)
        }
    }
}
