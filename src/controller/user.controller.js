const User = require('../models/userSchema');
const { trim } = require('validator');
const axios = require("axios");
const ApiError = require("../utils/Apierror");
const Apiresponse = require('../utils/Apiresponse');
const emailsent=require("../utils/email");

const Registration = async (req, res) => {

    const secretKey =process.env.SECRET_KEY;
        
    // const token = req.body.token;
    
    const { teamname, name, email, contactNumber, gender, studentId, residence, currentYear,token,branch} = req.body;
    // console.log(token);
    if (!token) {
    return res.status(401).json(new Apiresponse(401, null, 'Token is required for verification'));
    }
    if(token){
    const verifyurl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    const response = await axios.post(verifyurl);   

    if (response.data.success) 
    {
        const fields = { teamname, name, email, contactNumber, gender, studentId, residence, currentYear, token, branch };
        // const { name, email, contactNumber, Gender, StudentId, residence, CurrentYear } = req.body;
        if (Object.values(fields).some((field) => {
            if (field === undefined || field === null) {
                return true; // Field is undefined or null
            }
            return field.toString().trim() === "";
        })) {
            console.log("Field:", { teamname, name, email, contactNumber, gender, studentId, residence, currentYear, token, branch });
            throw new ApiError(400, "fill in all the details");
        }
        const exitingUser = await User.findOne(
            {
                $or: [{ email }, { studentId }, { contactNumber }, {teamname}]
            }
        )
        if (exitingUser) {
            return res.status(402).json(new Apiresponse(402, null, "user already register"));
            
        }
        console.log(exitingUser)
        const user = await User.create(
            {
                teamname,
                name,
                email,
                contactNumber,
                gender,
                studentId,
                residence,
                currentYear,
                branch
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
    else{
        return res.status(403).json(new Apiresponse(403, null , "Invalid Recaptcha"));
    }
    
}


}
     
module.exports = {
    Registration
}
