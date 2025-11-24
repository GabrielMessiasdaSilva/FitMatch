const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teamsController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, teamsController.list);
router.get('/:id', verifyToken, teamsController.getById);
router.put('/:id', verifyToken, teamsController.updateTeam);
router.patch('/:id/roster', verifyToken, teamsController.manageRoster);

module.exports = router;