const express = require('express');
const gernal = require('../controllers/gernalController');
const login = require('../controllers/loginController');
const router = express.Router();

router.post('/register', gernal.insertData);
router.post("/login", login.loginUser);


module.exports = router;
