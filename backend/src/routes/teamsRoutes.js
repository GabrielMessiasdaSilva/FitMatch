const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teamsController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/my-team', verifyToken, teamsController.getMyTeam);
router.get('/', verifyToken, teamsController.list);
router.get('/:id', verifyToken, teamsController.getById);
router.get('/:id/stats', verifyToken, teamsController.getWithPlayerCount); // com contagem de jogadores
router.put('/:id', verifyToken, teamsController.updateTeam);
router.patch('/:id/roster', verifyToken, teamsController.manageRoster);

module.exports = router;
