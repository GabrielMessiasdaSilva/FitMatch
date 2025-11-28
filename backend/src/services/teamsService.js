const { db, admin } = require('../firebase');

class TeamsService {
  async updateTeam(id, data) {
    const teamRef = db.collection('times').doc(id);
    await teamRef.update(data);
    return { id, ...data };
  }

  async getTeam(id) {
    const doc = await db.collection('times').doc(id).get();
    if (!doc.exists) throw new Error('Time não encontrado');
    return doc.data();
  }

  async getTeamWithPlayerCount(id) {
    const doc = await db.collection('times').doc(id).get();
    if (!doc.exists) throw new Error('Time não encontrado');
    const team = doc.data();
    
    // Buscar jogadores no roster (aceitos)
    const rosterPlayers = [];
    if (team.roster && team.roster.length > 0) {
      for (const playerId of team.roster) {
        try {
          const jogador = await db.collection('jogadores').doc(playerId).get();
          if (jogador.exists) {
            const jData = jogador.data();
            const usuario = await db.collection('usuarios').doc(jData.usuarioId).get();
            const nome = usuario.exists ? usuario.data().nome : '';
            
            rosterPlayers.push({
              id: playerId,
              jogadorId: playerId,
              nome,
              posicao: jData.posicao || '',
              idade: jData.idade || null
            });
          }
        } catch (e) {
          // ignore
        }
      }
    }
    
    // Contar jogadores presentes + candidatos pendentes
    const presentes = team.roster ? team.roster.length : 0;
    const candSnapshot = await db.collection('candidaturas')
      .where('timeId', '==', id)
      .where('status', '==', 'pending')
      .get();

    // Para cada candidatura pendente, buscar dados básicos do jogador
    const candidatos = [];
    for (const docItem of candSnapshot.docs) {
      const cand = docItem.data();
      // Buscar dados do jogador nas coleções `jogadores` e `usuarios`
      let jogador = null;
      try {
        const jDoc = await db.collection('jogadores').doc(cand.jogadorId).get();
        if (jDoc.exists) jogador = jDoc.data();
      } catch (e) {
        // ignore
      }

      // Buscar nome no documento de usuario relacionado quando possível
      let nome = '';
      if (jogador && jogador.usuarioId) {
        try {
          const uDoc = await db.collection('usuarios').doc(jogador.usuarioId).get();
          if (uDoc.exists) nome = uDoc.data().nome || '';
        } catch (e) {}
      }

      candidatos.push({
        id: cand.id || docItem.id,
        vagaId: cand.vagaId || null,
        jogadorId: cand.jogadorId,
        nome: nome || (jogador && jogador.nome) || '',
        posicao: jogador ? jogador.posicao || '' : '',
        idade: jogador ? jogador.idade || null : null,
        createdAt: cand.createdAt || null
      });
    }

    return {
      ...team,
      totalJogadores: presentes,
      candidaturasPendentes: candidatos.length,
      totalComCandidatos: presentes + candidatos.length,
      candidatos,
      rosterPlayers
    };
  }

  async listTeams(filters) {
    let query = db.collection('times');

    if (filters.sport) {
      query = query.where('sport', '==', filters.sport);
    }
    if (filters.neighborhood) {
      query = query.where('neighborhood', '==', filters.neighborhood);
    }
    if (filters.neededPosition) {
      query = query.where('neededPositions', 'array-contains', filters.neededPosition);
    }

    const snapshot = await query.get();
    return snapshot.docs.map(async (doc) => {
      const team = doc.data();
      const presentes = team.roster ? team.roster.length : 0;
      const candidatos = await db.collection('candidaturas')
        .where('timeId', '==', team.id)
        .where('status', '==', 'pending')
        .get();
      
      return {
        ...team,
        totalJogadores: presentes,
        candidaturasPendentes: candidatos.size,
        totalComCandidatos: presentes + candidatos.size
      };
    });
  }

  async manageRoster(teamId, playerId, action, posicao = '') {
    const teamRef = db.collection('times').doc(teamId);
    const rosterRef = db.collection('times').doc(teamId).collection('jogadores').doc(playerId);

    if (action === 'add') {
      await teamRef.update({
        roster: admin.firestore.FieldValue.arrayUnion(playerId)
      });
      // Salvar posição do jogador
      await rosterRef.set({ playerId, posicao, addedAt: Date.now() });
    } else if (action === 'remove') {
      await teamRef.update({
        roster: admin.firestore.FieldValue.arrayRemove(playerId)
      });
      await rosterRef.delete();
    } else if (action === 'update-position') {
      await rosterRef.update({ posicao });
    }

    const updated = await teamRef.get();
    return updated.data().roster;
  }
}

module.exports = new TeamsService();