const express = require('express');
const gernal = require('../controllers/gernalController');
const router = express.Router();

router.post('/register', gernal.registerUser);
router.post("/login", gernal.loginUser);


module.exports = router;
