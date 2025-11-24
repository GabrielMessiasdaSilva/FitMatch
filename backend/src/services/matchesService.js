const { db } = require('../firebase');

class MatchesService {
  // Jogador se candidata a um time
  async createMatchApplication(teamId, playerId) {
    // Verifica se já existe candidatura pendente
    const existsQuery = await db.collection('matches')
      .where('teamId', '==', teamId)
      .where('playerId', '==', playerId)
      .get();

    if (!existsQuery.empty) {
      throw new Error('Já existe uma candidatura para este time.');
    }

    const matchRef = db.collection('matches').doc();
    const matchData = {
      id: matchRef.id,
      teamId,
      playerId,
      status: 'pending', // pending | accepted | rejected
      createdAt: Date.now()
    };

    await matchRef.set(matchData);
    return matchData;
  }

  // Time responde (aceita/recusa)
  async updateMatchStatus(matchId, status) {
    if (!['accepted', 'rejected'].includes(status)) {
      throw new Error('Status inválido.');
    }

    const matchRef = db.collection('matches').doc(matchId);
    await matchRef.update({ status });
    
    const updatedDoc = await matchRef.get();
    return updatedDoc.data();
  }

  async listMatches(userId, userType) {
    let query = db.collection('matches');

    if (userType === 'player') {
      query = query.where('playerId', '==', userId);
    } else if (userType === 'team') {
      query = query.where('teamId', '==', userId);
    }

    const snapshot = await query.get();
    return snapshot.docs.map(doc => doc.data());
  }
}

module.exports = new MatchesService();