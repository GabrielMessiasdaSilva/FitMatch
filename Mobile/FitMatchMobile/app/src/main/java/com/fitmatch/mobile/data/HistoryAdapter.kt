package com.fitmatch.mobile.data

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.fitmatch.mobile.R
import com.fitmatch.mobile.model.GameHistory

class HistoryAdapter: ListAdapter<GameHistory, HistoryAdapter.HVH>(DIFF) {
    companion object {
        val DIFF = object: DiffUtil.ItemCallback<GameHistory>() {
            override fun areItemsTheSame(oldItem: GameHistory, newItem: GameHistory) = oldItem.uid==newItem.uid
            override fun areContentsTheSame(oldItem: GameHistory, newItem: GameHistory) = oldItem==newItem
        }
    }
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): HVH {
        val v = LayoutInflater.from(parent.context).inflate(android.R.layout.simple_list_item_2, parent, false)
        return HVH(v)
    }
    override fun onBindViewHolder(holder: HVH, position: Int) = holder.bind(getItem(position))
    inner class HVH(v: View): RecyclerView.ViewHolder(v) {
        private val t1 = v.findViewById<TextView>(android.R.id.text1)
        private val t2 = v.findViewById<TextView>(android.R.id.text2)
        fun bind(h: GameHistory) {
            t1.text = h.teamName + " • " + h.role
            t2.text = (if (h.attended) "Compareceu" else "Não compareceu") + " — " + h.dateIso
        }
    }
}
