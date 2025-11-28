const { db } = require('../firebase');
const teamsService = require('./teamsService');

class MatchesService {
  // Jogador se candidata a um time (ainda aceita teamId para compatibilidade)
  async createMatchApplication(teamId, playerId, vagaId = null) {
    // Verifica se já existe candidatura pendente
    const existsQuery = await db.collection('candidaturas')
      .where('teamId', '==', teamId)
      .where('jogadorId', '==', playerId)
      .get();

    if (!existsQuery.empty) {
      throw new Error('Já existe uma candidatura para este time.');
    }

    const candRef = db.collection('candidaturas').doc();
    const candData = {
      id: candRef.id,
      vagaId,
      timeId: teamId,
      jogadorId: playerId,
      status: 'pending', // pending | accepted | rejected
      createdAt: Date.now()
    };

    await candRef.set(candData);
    return candData;
  }

  // Time responde (aceita/recusa)
  async updateMatchStatus(matchId, status) {
    if (!['accepted', 'rejected'].includes(status)) {
      throw new Error('Status inválido.');
    }

    const candRef = db.collection('candidaturas').doc(matchId);
    const candDoc = await candRef.get();
    if (!candDoc.exists) throw new Error('Candidatura não encontrada.');

    const cand = candDoc.data();

    // Se já respondeu, não permite reprocessar
    if (cand.status === status) {
      return cand;
    }

    // Ao aceitar, adiciona o jogador ao roster do time (respeitando limite)
    if (status === 'accepted') {
      const teamId = cand.timeId;
      const jogadorId = cand.jogadorId;

      // Verifica se o time existe e limite
      const team = await teamsService.getTeam(teamId);
      const presentes = team.roster ? team.roster.length : 0;
      const max = team.maxJogadores || 0;
      if (max > 0 && presentes >= max) {
        throw new Error('Limite de jogadores atingido no time.');
      }

      // Tenta obter posição desejada a partir da vaga
      let posicao = '';
      if (cand.vagaId) {
        const vagaDoc = await db.collection('vagas').doc(cand.vagaId).get();
        if (vagaDoc.exists) {
          const vaga = vagaDoc.data();
          posicao = vaga.posicaoDesejada || '';
        }
      }

      // Adiciona ao roster via teamsService
      await teamsService.manageRoster(teamId, jogadorId, 'add', posicao);
    }

    // Atualiza o status da candidatura
    await candRef.update({ status });

    const updatedDoc = await candRef.get();
    return updatedDoc.data();
  }

  async listMatches(userId, userType) {
    let query = db.collection('candidaturas');

    if (userType === 'player') {
      query = query.where('jogadorId', '==', userId);
    } else if (userType === 'team') {
      query = query.where('timeId', '==', userId);
    }

    const snapshot = await query.get();
    return snapshot.docs.map(doc => doc.data());
  }
}

module.exports = new MatchesService();