const matchesService = require('../services/matchesService');

exports.apply = async (req, res) => {
  try {
    // Apenas players podem se candidatar
    if (req.user.type !== 'player') return res.status(403).json({ error: 'Apenas jogadores podem se candidatar.' });
    
    const { teamId } = req.body;
    const result = await matchesService.createMatchApplication(teamId, req.user.id);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.respond = async (req, res) => {
  try {
    // Apenas teams podem responder
    if (req.user.type !== 'team') return res.status(403).json({ error: 'Apenas times podem gerenciar candidaturas.' });
    
    const { matchId } = req.params;
    const { status } = req.body; // accepted or rejected

    // (Opcional) Verificar se o matchId pertence ao time que está logado para segurança extra
    
    const result = await matchesService.updateMatchStatus(matchId, status);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const result = await matchesService.listMatches(req.user.id, req.user.type);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};