const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, taskController.createTask);
router.get('/user', authMiddleware, taskController.getTasksByUserId);
router.put('/update', authMiddleware, taskController.updateTask);

module.exports = router;
