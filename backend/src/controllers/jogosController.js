const jogosService = require('../services/jogosService');

exports.getById = async (req, res) => {
  try {
    const gameId = req.params.id;
    const result = await jogosService.getGame(gameId);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (req.user.role !== 'team') return res.status(403).json({ error: 'Apenas times podem registrar jogos.' });
    const data = { ...req.body, timeId: req.user.id };
    const result = await jogosService.createGame(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.confirm = async (req, res) => {
  try {
    const gameId = req.params.id;
    const usuarioId = req.user.id;
    const result = await jogosService.confirmPresence(gameId, usuarioId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    if (req.user.role === 'team') {
      const result = await jogosService.getGamesByTeam(req.user.id);
      return res.json(result);
    }
    // player
    const result = await jogosService.getGamesByPlayer(req.user.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
