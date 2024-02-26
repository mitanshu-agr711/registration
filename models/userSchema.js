import mongoose from "mongoose";

const User_Schema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    StudentId:{
        type:Number,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true
    },
    residence:{
        type:String,
        enum:["HOSTLER",'DAYSCHOLAR'],
        default:"HOSTLER",
        require:true,
    },
    CurrentYear:{
        type:Number,
        enum:["1","2"],
        default:"1"
    }
},
{
    timestamps:true
});

const User=mongoose.module("User",User_Schema);
module.exports=User;