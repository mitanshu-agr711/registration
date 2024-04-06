const User = require('../models/userSchema');

const mongoose = require('mongoose');
const { Apierror } = require('../utils/Apierror');
const { trim } = require('validator');
const { Apiresponse } = require('../utils/Apiresponse');

const Registration = async(req,res) => {
    try {
  const { name,email,contactNumber, Gender, StudentId, residence, CurrentYear}=req.body;
    if([name,email,Gender,StudentId,residence,CurrentYear].some((field)=>
        field?.trim()==="" ))
        {
            throw new Apierror(400,"fill the all details");
        }
        const exitingUser=await User.findOne(
            {
                $or:[{email},{StudentId},{contactNumber}]
            }
        )
        if(exitingUser)
        {
            throw new Apierror(402,"user already register")
        }
        const user=await User.create(
            {
                name,
                email,
                contactNumber,
                Gender,
                StudentId,
                residence,
                CurrentYear
            }
        )
        if(user)
        {
          return res.json(
            new Apiresponse(200,user,"user successfully register")
            )
        }
    } 
    catch (error) {
        console.log("solve this",error)
        throw new Apierror(404,"something went wrong")
    }

}
module.exports = {
    Registration
}
