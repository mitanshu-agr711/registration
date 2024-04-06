const express = require('express');

const router = express.Router();

// const UserModel = require('../models/userSchema.js');
try {
    const {Registration}= require('../controller/user.controller.js');
    const verifyCapcha= require('../utils/recapcha.js')
    
    router.post('/user/Registeration', Registration);
    router.post('/sumbit', verifyCapcha);
} catch (error) {
    console.log("ye rha error",error)
}

module.exports = router;