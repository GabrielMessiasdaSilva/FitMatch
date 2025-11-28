const { db, admin } = require('../firebase');

class AvaliacoesService {
  async createAvaliacao(data) {
    const avaliacaoRef = db.collection('avaliacoes').doc();
    const avaliacaoData = {
      id: avaliacaoRef.id,
      jogadorId: data.jogadorId,
      jogoId: data.jogoId,
      nota: data.nota,
      comentario: data.comentario || '',
      createdAt: Date.now()
    };
    await avaliacaoRef.set(avaliacaoData);

    // Atualiza rating médio no documento do jogador
    await this.recalculateRating(avaliacaoData.jogadorId);

    return avaliacaoData;
  }

  async recalculateRating(jogadorId) {
    const snap = await db.collection('avaliacoes').where('jogadorId', '==', jogadorId).get();
    if (snap.empty) return;
    const notas = snap.docs.map(d => d.data().nota || 0);
    const soma = notas.reduce((s, v) => s + v, 0);
    const media = soma / notas.length;
    await db.collection('jogadores').doc(jogadorId).update({ rating: media });
    return media;
  }

  async listByPlayer(jogadorId) {
    const snap = await db.collection('avaliacoes').where('jogadorId', '==', jogadorId).get();
    return snap.docs.map(d => d.data());
  }

  async listByGame(jogoId) {
    const snap = await db.collection('avaliacoes').where('jogoId', '==', jogoId).get();
    return snap.docs.map(d => d.data());
  }
}

module.exports = new AvaliacoesService();
