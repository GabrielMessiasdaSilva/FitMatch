const express = require('express');
const router = express.Router();
const vagasController = require('../controllers/vagasController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, vagasController.create);
router.patch('/:id/close', verifyToken, vagasController.close);
router.get('/', verifyToken, vagasController.list);
router.post('/:id/aceitar', verifyToken, vagasController.accept); // Jogador aceita vaga

module.exports = router;
