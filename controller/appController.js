const UserModel = require('../models/userSchema.js');

const mongoose = require('mongoose');

const Registration = async(req,res) => {

    try {
        
        let result = await UserModel.create({
            ...req.body,
           
        })


        res.send({
            data: result,
            message: "User created successfully....!!",
            status: true
        })


    } catch (error) {

        res.status(403).json({ status: false, error: error })
        
    }

}


module.exports = {
    Registration
}
