const express = require('express');
const router = express.Router();
const matchesController = require('../controllers/matchesController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Jogador aplica
router.post('/', verifyToken, matchesController.apply);

// Time responde (ID do match na URL)
router.patch('/:matchId/respond', verifyToken, matchesController.respond);

// Listar minhas candidaturas (player) ou candidatos (team)
router.get('/my-matches', verifyToken, matchesController.list);

module.exports = router;