const matchesService = require('../services/matchesService');

exports.apply = async (req, res) => {
  try {
    // Apenas players podem se candidatar
    if (req.user.role !== 'player') return res.status(403).json({ error: 'Apenas jogadores podem se candidatar.' });

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
    if (req.user.role !== 'team') return res.status(403).json({ error: 'Apenas times podem gerenciar candidaturas.' });
    
    const { matchId } = req.params;
    const { status } = req.body; // accepted or rejected

    // Verificar se a candidatura pertence ao time logado
    const candRef = require('../firebase').db.collection('candidaturas').doc(matchId);
    const candDoc = await candRef.get();
    if (!candDoc.exists) return res.status(404).json({ error: 'Candidatura não encontrada.' });
    const cand = candDoc.data();
    if (cand.timeId !== req.user.id) return res.status(403).json({ error: 'Você não tem permissão para gerenciar esta candidatura.' });

    const result = await matchesService.updateMatchStatus(matchId, status);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const result = await matchesService.listMatches(req.user.id, req.user.role);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};