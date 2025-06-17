const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/userModel")

const auth=async(req,res,next)=>{

    try{    

        const {token}=req.cookies;

        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token not found"
            })
        }
        const decoded=await jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded);
        req.user=decoded;

        next();




    }catch(err){
        res.send("Error "+err.message)
    }


}


// student

const isStudent=async(req,res,next)=>{

    try{    


        if(req.user?.accountType!=="student"){
              return res.status(400).json({
                success:false,
                message:"Invalid accountType"
            })
        }
        req.user=decoded;

        next();

    }catch(err){
        res.send("Error "+err.message)
    }
}

//admin
const isAdmin=async(req,res,next)=>{

    try{    



        if(req.user?.accountType!=="admin"){
              return res.status(400).json({
                success:false,
                message:"Invalid accountType"
            })
        }
        req.user=decoded;

        next();

    }catch(err){
        res.send("Error "+err.message)
    }
}

//instructor
const isInstructor=async(req,res,next)=>{

    try{    



        if(req.user.accountType!=="instructor"){
              return res.status(400).json({
                success:false,
                message:"Invalid accountType"
            })
        }
        req.user=decoded;

        next();

    }catch(err){
        res.send("Error "+err.message)
    }
}


module.exports={
    isAdmin,isStudent,isInstructor,auth
}