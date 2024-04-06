const { MongoAPIError } = require("mongodb");
const { ApiError } = require('../utils/Apierror')
const { Apiresponse } = require('../utils/Apiresponse')


const verifyCapcha = async (req,res) => {
    const secretKey ="6Lev2bEpAAAAAGqV6EM1GkUVtNFJa2Benozmc6GN";
    const token = req.body.token;
    console.log(token)
    console.log(secretKey)
    if (!token) {
        throw new ApiError(401, "for verification please hit the verify button")
    }
    console.log(`secret=${secretKey} & response=${token}`)
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
    console.log(data)
    res.json(data)
}
module.exports=verifyCapcha