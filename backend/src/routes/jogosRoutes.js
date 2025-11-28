const express = require('express');
const router = express.Router();
const jogosController = require('../controllers/jogosController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, jogosController.create); // registrar jogo
router.get('/:id', verifyToken, jogosController.getById); // obter jogo específico
router.patch('/:id/presenca', verifyToken, jogosController.confirm); // confirmar presença
router.get('/', verifyToken, jogosController.list); // listar meus jogos (time ou player)

module.exports = router;
