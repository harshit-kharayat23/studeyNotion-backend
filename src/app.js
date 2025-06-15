const express=require("express");
require("dotenv").config()
const connectDB=require("./config/database")
const app=express();
const cookieParser = require("cookie-parser");

app.use(express.json())
app.use(cookieParser())






connectDB().then(()=>{

    console.log("Database connected successfully !");

    app.listen(process.env.PORT_NUMBER,()=>{
        console.log("App listening in port number 4000")
    })


}).catch((err)=>{

    console.log("DB connection failed! "+err)
    process.exit(1);

})


