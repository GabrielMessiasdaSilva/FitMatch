const { db } = require('../firebase');

class PlayersService {
  async updateProfile(id, data) {
    const playerRef = db.collection('players').doc(id);
    // Garante que o ID não seja sobrescrito incorretamente, mas mantém consistência
    await playerRef.update(data);
    return { id, ...data };
  }

  async getPlayer(id) {
    const doc = await db.collection('players').doc(id).get();
    if (!doc.exists) throw new Error('Jogador não encontrado');
    return doc.data();
  }

  async listPlayers(filters) {
    let query = db.collection('players');

    if (filters.position) {
      query = query.where('position', '==', filters.position);
    }
    if (filters.neighborhood) {
      query = query.where('neighborhood', '==', filters.neighborhood);
    }
    // Nota: Firestore permite apenas um 'array-contains' por query
    if (filters.sport) {
      query = query.where('sports', 'array-contains', filters.sport);
    }

    const snapshot = await query.get();
    return snapshot.docs.map(doc => doc.data());
  }

  async toggleFavorite(playerId, teamId) {
    const playerRef = db.collection('players').doc(playerId);
    const doc = await playerRef.get();
    if (!doc.exists) throw new Error('Jogador não encontrado');
    
    let favorites = doc.data().favorites || [];
    
    if (favorites.includes(teamId)) {
      favorites = favorites.filter(id => id !== teamId);
    } else {
      favorites.push(teamId);
    }

    await playerRef.update({ favorites });
    return favorites;
  }
}

module.exports = new PlayersService();