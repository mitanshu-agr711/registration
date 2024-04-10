const User = require('../models/userSchema');
const { trim } = require('validator');
const axios = require("axios");
const ApiError = require("../utils/Apierror")
const Apiresponse = require('../utils/Apiresponse');
const emailsent=require("../utils/email")
const Registration = async (req, res) => {

    const secretKey =process.env.SECRET_KEY;
        
    // const token = req.body.token;
    const { name, email, contactNumber, gender, studentId, residence, currentYear,token } = req.body;
    // const { name, email, contactNumber, gender, studentId, residence, currentYear } = req.body;

    // console.log(token);
    if (!token) {
    return res.status(401).json(new Apiresponse(401, null, 'Token is required for verification'));
    }
    if(token){
    const verifyurl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    const response = await axios.post(verifyurl);
    if (response.data.success) {
        // const { name, email, contactNumber, Gender, StudentId, residence, CurrentYear } = req.body;
        if (Object.values({ name, email, contactNumber, gender, studentId, residence, currentYear,token }).some((field) =>field.toString().trim() === "")) {
            throw new ApiError (400, "fill the all details");
        }
        const exitingUser = await User.findOne(
            {
                $or: [{ email }, { studentId }, { contactNumber }]
            }
        )
        if (exitingUser) {
            return res.status(402).json(new Apiresponse(402, null, "user already register"));
            
        }
        console.log(exitingUser)
        const user = await User.create(
            {
                name,
                email,
                contactNumber,
                gender,
                studentId,
                residence,
                currentYear
            }
        )
        if (user) {
            console.log(user.email)
            emailsent.sendMail(user.email);
            return res.json(
                new Apiresponse(200, user, "user successfully register and check your mail")
            )
        }
    }
    if (!response.data.success) {
        return res.status(401).json(new Apiresponse(401, null, 'Failed reCAPTCHA verification'));
    }
}


}
     
module.exports = {
    Registration
}
