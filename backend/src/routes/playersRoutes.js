const express = require('express');
const router = express.Router();
const playersController = require('../controllers/playersController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, playersController.list);
router.get('/:id', verifyToken, playersController.getById);
router.put('/:id', verifyToken, playersController.updateProfile);
router.post('/:id/favorite', verifyToken, playersController.toggleFavorite);

module.exports = router;