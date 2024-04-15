require("dotenv").config();

const express=require("express");
// console.log("hello")
const appRoute = require('./routes/user.routes.js');
const bodyParser = require('body-parser');

const cors = require('cors');

express.use(cors());

const app=express();

const port = process.env.PORT ||3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.json());

const connectDB = require('./db/connect.db.js');

connectDB()

// const views = path.join(__dirname, "./views/index.hbs");

// app.set("view engine","hbs");
// app.set("views", path.join(views, "views"));
// app.get('/contact', (req, res) => {
//     res.render('contact');
// });



app.use('/',appRoute);

app.get('/',(req,res)=>{
    res.send('Hello everyone, Your name');
})

app.listen(port,()=>{
    console.log(`Server is runing on http://localhost:${port}`) 
})

