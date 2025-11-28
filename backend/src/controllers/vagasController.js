const vagasService = require('../services/vagasService');

exports.create = async (req, res) => {
  try {
    // Apenas times podem criar vagas
    if (req.user.role !== 'team') return res.status(403).json({ error: 'Apenas times podem criar vagas.' });

    const data = { ...req.body, timeId: req.user.id };
    const result = await vagasService.createVaga(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.close = async (req, res) => {
  try {
    const vagaId = req.params.id;
    // (Opcional) verificar se vaga pertence ao time
    const result = await vagasService.closeVaga(vagaId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const filters = {};
    if (req.query.timeId) filters.timeId = req.query.timeId;
    if (req.query.status) filters.status = req.query.status;
    const result = await vagasService.listVagas(filters);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.accept = async (req, res) => {
  try {
    if (req.user.role !== 'player') return res.status(403).json({ error: 'Apenas jogadores podem aceitar vagas.' });
    const vagaId = req.params.id;
    const jogadorId = req.user.id;
    const result = await vagasService.acceptVaga(vagaId, jogadorId);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
