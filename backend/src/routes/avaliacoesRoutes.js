const express = require('express');
const router = express.Router();
const avaliacoesController = require('../controllers/avaliacoesController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, avaliacoesController.create);
router.get('/jogador/:jogadorId', verifyToken, avaliacoesController.listByPlayer);
router.get('/jogo/:jogoId', verifyToken, avaliacoesController.listByGame);

module.exports = router;
