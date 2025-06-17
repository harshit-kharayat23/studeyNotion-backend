const User = require("../models/userModel");
const Otp = require("../models/otp");
const otpGenerator = require("otp-generator");
const bcrypt=require("bcrypt")
const Profile=require("../models/profileModel")
const jwt=require("jsonwebtoken");
require("dotenv").config();
// sign Up
exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      emailId,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !emailId ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (password !== confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "Password did not match",
      });
    }

    const checkUser = await User.findOne({ emailId });
    if (checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Already exists ",
      });
    }
    const recentOtp = await Otp.findOne({ emailId })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp);
    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Otp not Found",
      });
    } else if (recentOtp.otp !== otp) {
      if (recentOtp.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Otp not valid",
        });
      }
    } 
    const hashPassword=await bcrypt.hash(password,10);

    const profileDetails=await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null,
    })

    

    const user=new User({
        firstName,
        lastName,
        password:hashPassword,
        emailId,
        accountType,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/9.x/initials/svg?seed=${firstName}%20${lastName}`
    })
    await user.save();
    return res.status(200).json({
        success:true,
        message:"User Registered Successfully!",
        data:user,
    })


  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error: " + err.message,
    });
  }
};

// login
exports.login=async(req,res)=>{

    try{
            
        const {emailId,password}=req.body;

        if(!emailId ||!password ){
            return res.status(403).json({
                success:false,
                message:"Fill all the credentials"
            })
        }
        const checkUser=await User.findOne({emailId}).populate("additionalDetails");
        if(!checkUser){
            return res.status(401).json({
            success: false,
            message: "Please Sign Up",
        });
        }
      
        const validPass=await bcrypt.compare(password,checkUser.password)
            if(!validPass){
        
                return res.status(401).json({
                success: false,
                message: "Incorrect Password",
                }
            )
            }

            const payload={
                emailId:checkUser.emailId,
                _id:checkUser._id,
                accountType:checkUser.accountType,
            }

            const token=await jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {expiresIn:"2d"})

            checkUser.token=token;
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                checkUser,
                message:"Logged In SuccessFully"
            })

        

    }catch(err){
        res.status(401).json({
            success: false,
            message: "Error: "+err.message,
        });
    }
   



}

// send Otp
exports.sendOTP = async (req, res) => {
  try {
    const { emailId } = req.body;

    const checkUser = await User.findOne({ emailId });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User Already Exists.... Please Login...",
      });
    }

    // generate Otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("Otp Generated :", otp);

    const result = await Otp.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await Otp.findOne({ otp });
    }

    const otpPayLoad = new Otp({ emailId, otp });

    await otpPayLoad.save();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error:" + err.message,
    });
  }
};

// change password
