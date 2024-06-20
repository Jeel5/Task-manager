const express = require('express');
const gernal = require('../controllers/gernalController');
const router = express.Router();

router.post('/register', gernal.insertData);

module.exports = router;
