const playersService = require('../services/playersService');

exports.updateProfile = async (req, res) => {
  try {
    // Apenas o próprio usuário pode atualizar seu perfil
    if (req.user.id !== req.params.id) return res.status(403).json({ error: 'Proibido' });
    
    const result = await playersService.updateProfile(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await playersService.getPlayer(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const filters = {
      position: req.query.position,
      neighborhood: req.query.neighborhood,
      sport: req.query.sport
    };
    const result = await playersService.listPlayers(filters);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) return res.status(403).json({ error: 'Proibido' });
    const { teamId } = req.body;
    const result = await playersService.toggleFavorite(req.params.id, teamId);
    res.json({ favorites: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};