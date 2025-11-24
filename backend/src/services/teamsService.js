const { db } = require('../firebase');
const admin = require('firebase-admin');

class TeamsService {
  async updateTeam(id, data) {
    const teamRef = db.collection('teams').doc(id);
    await teamRef.update(data);
    return { id, ...data };
  }

  async getTeam(id) {
    const doc = await db.collection('teams').doc(id).get();
    if (!doc.exists) throw new Error('Time não encontrado');
    return doc.data();
  }

  async listTeams(filters) {
    let query = db.collection('teams');

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
    return snapshot.docs.map(doc => doc.data());
  }

  async manageRoster(teamId, playerId, action) {
    const teamRef = db.collection('teams').doc(teamId);
    
    if (action === 'add') {
      await teamRef.update({
        roster: admin.firestore.FieldValue.arrayUnion(playerId)
      });
    } else if (action === 'remove') {
      await teamRef.update({
        roster: admin.firestore.FieldValue.arrayRemove(playerId)
      });
    }
    
    const updated = await teamRef.get();
    return updated.data().roster;
  }
}

module.exports = new TeamsService();