const User = require('../models/userSchema');
const axios = require("axios");
const ApiError = require("../utils/Apierror");
const Apiresponse = require('../utils/Apiresponse');
const emailsent = require("../utils/email");

const Registration = async (req, res) => {
    const secretKey = process.env.SECRET_KEY;
    const { teamname, name, email, contactNumber, gender, studentId, residence, currentYear, token, branch } = req.body;

    // Check if token exists
    if (!token) {
        return res.status(401).json(new Apiresponse(401, null, 'Token is required for verification'));
    }

    // Verify reCAPTCHA token
    try {
        const verifyurl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
        const response = await axios.post(verifyurl);
        
        if (!response.data.success) {
            return res.status(403).json(new Apiresponse(403, null, "Invalid Recaptcha"));
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(new Apiresponse(500, null, "Internal Server Error"));
    }

    // Validate and create user
    try {
        const user = await User.create({
            teamname,
            name,
            email,
            contactNumber,
            gender,
            studentId,
            residence,
            currentYear,
            branch
        });
        emailsent.sendMail(user.email);
        return res.status(200).json(new Apiresponse(200, user, "User successfully registered. Check your email."));
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = {};
            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            return res.status(400).json(new Apiresponse(400, null, errors));
        } else if (error.code === 11000) {
            return res.status(402).json(new Apiresponse(402, null, "User already registered"));
        } else {
            console.error(error);
            return res.status(500).json(new Apiresponse(500, null, "Internal Server Error"));
        }
    }
};

module.exports = {
    Registration
};
