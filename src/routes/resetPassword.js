const User=require("../models/userModel")
const maileSender=require("../utils/mailSender")
const bcrypt=require("bcrypt")
// resetPasswordToken
const resetPasswordToken=async(req,res)=>{
    // get email from req body
    // generate token

    try{

            const {emailId}=req.body;
    const user=await User.findOne({emailId});
    if(!user){
        return res.status(400).json({
            success:false,
            message:"Your email is not registered!"
        })
    }
    //generate token
    const token=crypto.randomUUID();
    // add token expiry time in user

    const updateDetails=await User.findOneAndUpdate({
        emailId:emailId
    }
    ,{
        token,
        resetPasswordExpires:Date.now()+5*60*1000
    },
{
    new:true,
})


//create url
    const url=`http://localhost:3000/update-password/${token}`

//send mail
    await maileSender(emailId,"Password Reset Link",`Password reset Link ${url}`)

    return res.json({
        success:true,
        message:"email sent successfully!"
    })






    }catch(err){
        console.log('Error: ',err.message);  
    }

    

}


///reset password

const resetPassword=async(req,res)=>{

    try{

            const {password,confirmPassword,token}=req.body;
    if(password!==confirmPassword){
        return res.status(400).send("Password does not match confirm password!");

    }
    const userDetails=await User.findOne({
        token:token
    }),
    if(!userDetails){
        res.json({
            success:false,
            message:"Token Invalid!"
        })
    }
    if(userDetails.resetPasswordExpires<Date.now()){
            res.json({
            success:false,
            message:"Token expired!"
        })
    }

    const hashPass=await bcrypt.hash(password,10);

    await User.findOneAndUpdate(
        {
            token:token,
        },
        {   
            password:hashPass,
        },
        {
            new:true
        }
    )

    return res.json({
        success:true,
        message:"Password updated successfully!"
    })




    }catch(err){
        res.json({
            success:false,
            message:err,
        })
    }


    

}