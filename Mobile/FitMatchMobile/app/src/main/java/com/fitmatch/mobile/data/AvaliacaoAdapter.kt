package com.fitmatch.mobile.data

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.fitmatch.mobile.R
import com.fitmatch.mobile.model.Avaliacao
import java.text.SimpleDateFormat
import java.util.*

class AvaliacaoAdapter : RecyclerView.Adapter<AvaliacaoAdapter.AvalViewHolder>() {

    private var list: List<Avaliacao> = emptyList()

    fun submitList(newList: List<Avaliacao>) {
        list = newList
        notifyDataSetChanged()
    }

    class AvalViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val nota: TextView = itemView.findViewById(R.id.tv_note)
        val comentario: TextView = itemView.findViewById(R.id.tv_comment)
        val data: TextView = itemView.findViewById(R.id.tv_date)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AvalViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_avaliacao, parent, false)
        return AvalViewHolder(view)
    }

    override fun getItemCount() = list.size

    override fun onBindViewHolder(holder: AvalViewHolder, position: Int) {
        val a = list[position]

        holder.nota.text = "Nota: ${a.nota}"
        holder.comentario.text = a.comentario

        val sdf = SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault())
        holder.data.text = sdf.format(Date(a.createdAt))
    }
}
