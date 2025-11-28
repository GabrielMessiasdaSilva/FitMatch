const avaliacoesService = require('../services/avaliacoesService');

exports.create = async (req, res) => {
  try {
    // Apenas times podem avaliar jogadores (após jogo)
    if (req.user.role !== 'team') return res.status(403).json({ error: 'Apenas times podem avaliar jogadores.' });

    const data = req.body; // { jogadorId, jogoId, nota, comentario }
    const result = await avaliacoesService.createAvaliacao(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listByPlayer = async (req, res) => {
  try {
    const jogadorId = req.params.jogadorId;
    const result = await avaliacoesService.listByPlayer(jogadorId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listByGame = async (req, res) => {
  try {
    const jogoId = req.params.jogoId;
    const result = await avaliacoesService.listByGame(jogoId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
