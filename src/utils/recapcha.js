const { MongoAPIError } = require("mongodb");
const { ApiError } = require('../utils/Apierror')
const { Apiresponse } = require('../utils/Apiresponse')


const verifyCapcha = async () => {
    const secretKey = process.env.SECREATE_KEY;
    const token = req.body;
    if (!token) {
        throw new ApiError(401, "for verification please hit the verify button")
    }
    const response = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-unlencoded",
            },

            body: `secret=${secretKey} & response=${token}`,
        }
    );
    const data = await response.json();
    return data;
}
module.exports=verifyCapcha