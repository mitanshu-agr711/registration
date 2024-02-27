const express=require("express");
const mongoose = require("mongoose");
const bodyparser = require('body-parser');


const app=express();

mongoose.connect('mongodb://localhost:27017/conatus')

app.use(express.json());

const PORT=8000;

app.listen(PORT,()=>{
    console.log(`server port is ${PORT}`);
})

//hii this is test commit hii test 