const express = require('express');

const router = express.Router();

const UserModel = require('../models/userSchema.js');
const {Registration} = require('../controller/appController.js');


router.post('/Registeration',Registration);

module.exports = router;