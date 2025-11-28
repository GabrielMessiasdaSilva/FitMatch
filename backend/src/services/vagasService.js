const { db } = require('../firebase');

class VagasService {
  async createVaga(data) {
    const vagaRef = db.collection('vagas').doc();
    const vagaData = {
      id: vagaRef.id,
      timeId: data.timeId,
      sport: data.sport || '',
      posicaoDesejada: data.posicaoDesejada || '',
      data: data.data || '',
      hora: data.hora || '',
      local: data.local || '',
      status: data.status || 'open', // open | closed
      createdAt: Date.now()
    };
    await vagaRef.set(vagaData);
    return vagaData;
  }

  async closeVaga(id) {
    const vagaRef = db.collection('vagas').doc(id);
    await vagaRef.update({ status: 'closed' });
    const doc = await vagaRef.get();
    return doc.data();
  }

  async listVagas(filters = {}) {
    let query = db.collection('vagas');
    if (filters.timeId) query = query.where('timeId', '==', filters.timeId);
    if (filters.status) query = query.where('status', '==', filters.status);
    const snapshot = await query.get();
    return snapshot.docs.map(d => d.data());
  }

  async acceptVaga(vagaId, jogadorId) {
    const vagaDoc = await db.collection('vagas').doc(vagaId).get();
    if (!vagaDoc.exists) throw new Error('Vaga não encontrada');
    const vaga = vagaDoc.data();

    const candRef = db.collection('candidaturas').doc();
    const candData = {
      id: candRef.id,
      vagaId: vagaId,
      timeId: vaga.timeId,
      jogadorId: jogadorId,
      status: 'pending',
      createdAt: Date.now()
    };
    await candRef.set(candData);
    return candData;
  }
}

module.exports = new VagasService();
