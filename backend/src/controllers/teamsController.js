const teamsService = require('../services/teamsService');

exports.getMyTeam = async (req, res) => {
  try {
    const result = await teamsService.getTeamWithPlayerCount(req.user.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) return res.status(403).json({ error: 'Proibido' });
    const result = await teamsService.updateTeam(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await teamsService.getTeam(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getWithPlayerCount = async (req, res) => {
  try {
    const result = await teamsService.getTeamWithPlayerCount(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const filters = {
      sport: req.query.sport,
      neighborhood: req.query.neighborhood,
      neededPosition: req.query.neededPosition
    };
    const results = await teamsService.listTeams(filters);
    const teamData = await Promise.all(results);
    res.json(teamData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.manageRoster = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) return res.status(403).json({ error: 'Proibido' });
    const { playerId, action, posicao } = req.body; // action: 'add', 'remove', 'update-position'
    const result = await teamsService.manageRoster(req.params.id, playerId, action, posicao);
    res.json({ roster: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
