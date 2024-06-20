const express = require('express');
const gernalController = require('../controllers/gernalController');
const router = express.Router();

router.post('/register', gernalController.insertData);

module.exports = router;
