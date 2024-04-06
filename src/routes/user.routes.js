const express = require('express');

const router = express.Router();

// const UserModel = require('../models/userSchema.js');
const { Registration } = require('../controller/user.controller.js');
const {verifyCapcha } = require('../utils/recapcha.js')

router.post('/user/Registeration', Registration);
router.post('/verifycapcha', verifyCapcha);

module.exports = router;