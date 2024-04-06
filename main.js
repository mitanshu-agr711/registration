require("dotenv").config();

const express=require("express");

const appRoute = require('./Route/route.js')
const bodyParser = require('body-parser');


const app=express();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.json());

const connectDB = require('./mongoose');

connectDB()



app.use('/',appRoute);

app.get('/',(req,res)=>{
    res.send('Hello everyone, Your name');
})

app.listen(port,()=>{
    console.log(`Server is runing on http://localhost:${port}`)
    
})



