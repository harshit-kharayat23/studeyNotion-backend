const express=require("express");
const validation = require("../utils/validation");
const authRouter=express.Router();
const bcrypt=require("bcrypt")
const User=require("../models/userModel")
const Otp=require("../models/otp")
const Profile=require("../models/profileModel")
const jwt=require("jsonwebtoken");
const {auth}=require("../middlewares/auth")
require("dotenv").config()


//signUp
authRouter.post("/signup",async (req,res)=>{


        try{
            // validation
            validation(req);
            const {firstName,lastName,emailId,password,accountType,otp,additionalDetails}=req.body;
            // 
            const existingUser=await User.findOne(emailId);
            if(existingUser){
                return res.json({
                    message:"User exist with this emailId!"
                })
            }

            // find most recent otp

            const recentOtp=await Otp.findOne({emailId}).sort({createdAt:-1}).limit(1);
            console.log(recentOtp);

            //validate otp
            if(recentOtp.length===0){
                return res.status(400).json({
                    sucess:false,
                    message:"Otp not found!"
                })
            }
            else if(recentOtp!==otp){
                return res.status(400).json({
                    sucess:false,
                    message:"Otp not valid!"
                })
            }
            

            // encrypting password
            const hashPass=await bcrypt(password,10);
            const profileDetails=await Profile.create({
                gender:null,
                dateOfBirth:null,
                about:null,
                contactNumber:null,
            })

            const user=new User({
                firstName,
                lastName,
                emailId,
                password:hashPass,
                accountType,
                additionalDetails:profileDetails,
                image: `https://api.dicebear.com/5 .x/initials/svg?seed=${firstName} ${lastName}`
            })
            await user.save();

            res.json({
                sucess:true,
                message:`${accountType} account created successFully !`,
                data:user,
            })


        }catch(err){
            res.status(400).send("Error: "+err.message);

        }

})


//login
authRouter.post("/login",auth,async(req,res)=>{


    try{
            //fetch data
            validation(req);
            const{emailId,password,accountType}=req.body;
            // check emailId
            const existingUser=await User.findOne(emailId).populate("additionalDetails");;
                if(!existingUser){
                     return res.json({
                        message:"Please sign Up!"
                 })
            }

            // check password

            const validPass=await bcrypt.compare(password,existingUser.password);
                if(!validPass){
                    return res.status(400).json({
                        sucess:false,
                        message:"Password is incorrect!"
                    })
             }

             // genreate a token
             const options={
                _id:existingUser._id,
                accountType:existingUser.accountType,
                emailId:existingUser.emailId,
             }
             const token=await jwt.sign(options,process.env.JWT_SECRET,{expiresIn:"2h"});

             res.cookie("token",token,{expires:Date.now()+3 *24*60*60*100 ,httpOnly:true});


             res.status(200).json({
                success:true,
                message:"Logged In successfully!",
                data:existingUser,
             })



        
    }catch(err){
        res.status(400).send("Error: "+err.message);
    }






})


//sendOTP

// authRouter.get("/otp",async(req,res)=>{



// })

authRouter.post("/changepassword",async(req,res)=>{

        const {emailId,currentPassword,newPassword}=req.body;
        validation();
        

})




module.exports=authRouter;