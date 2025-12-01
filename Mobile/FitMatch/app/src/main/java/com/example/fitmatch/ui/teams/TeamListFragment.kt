package com.fitmatch.mobile.ui.teams

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.fitmatch.mobile.databinding.FragmentTeamListBinding
import com.fitmatch.mobile.model.Team
import com.google.firebase.firestore.FirebaseFirestore

class TeamListFragment : Fragment() {

    private var _binding: FragmentTeamListBinding? = null
    private val binding get() = _binding!!

    private val db = FirebaseFirestore.getInstance()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentTeamListBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {

        binding.teamRecycler.layoutManager = LinearLayoutManager(requireContext())

        db.collection("teams").get().addOnSuccessListener { docs ->

            val list = docs.map { it.toObject(Team::class.java) }

            binding.teamRecycler.adapter = TeamAdapter(list)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
