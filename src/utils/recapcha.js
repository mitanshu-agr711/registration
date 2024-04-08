const axios = require("axios");
const ApiError = require('../utils/Apierror');
const Apiresponse = require('../utils/Apiresponse');

const verifyCapcha = async (req, res) => {
    try {
        const secretKey = "6Lev2bEpAAAAAGqV6EM1GkUVtNFJa2Benozmc6GN";
        const token = req.body.token;
        
        if (!token) {
            throw new ApiError(401, "For verification, please hit the verify button");
        }
        const verifyurl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
        const response = await axios.post(verifyurl);

        if(response.data.success)
        {
             
        }
        if(!response.data.success)
        {
            throw new ApiError(401, 'user is not trusty');
        }
        res.json(new Apiresponse(200, response.data, "Verified"));
    } catch (error) {
        console.log("Verification error", error);
        throw new ApiError(500, 'Server error');
    }
}

module.exports = verifyCapcha;
