const { db, admin } = require('../firebase');

class JogosService {
  async getGame(gameId) {
    const doc = await db.collection('jogos').doc(gameId).get();
    if (!doc.exists) {
      throw new Error('Jogo não encontrado');
    }
    return doc.data();
  }

  async createGame(data) {
    const gameRef = db.collection('jogos').doc();
    const gameData = {
      id: gameRef.id,
      timeId: data.timeId,
      data: data.data || '',
      local: data.local || '',
      jogadoresPresentes: data.jogadoresPresentes || [],
      createdAt: Date.now()
    };
    await gameRef.set(gameData);
    return gameData;
  }

  async confirmPresence(gameId, usuarioId) {
    const gameRef = db.collection('jogos').doc(gameId);
    await gameRef.update({ jogadoresPresentes: admin.firestore.FieldValue.arrayUnion(usuarioId) });
    const doc = await gameRef.get();
    return doc.data();
  }

  async getGamesByTeam(teamId) {
    const snapshot = await db.collection('jogos').where('timeId', '==', teamId).get();
    return snapshot.docs.map(d => d.data());
  }

  async getGamesByPlayer(usuarioId) {
    // Busca jogos onde jogadoresPresentes contém o usuarioId
    const snapshot = await db.collection('jogos').where('jogadoresPresentes', 'array-contains', usuarioId).get();
    return snapshot.docs.map(d => d.data());
  }
}

module.exports = new JogosService();
