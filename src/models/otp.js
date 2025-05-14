const mongoose =require("mongoose");
const maileSender=require("../utils/mailSender")

const otpSchema=mongoose.Schema({

        emailId:{
            type:String,
            required:true,

        },
        otp:{
            type:String,
            required:true,

        },
        createdAt:{
            type:Date,
            default:Date.now(),
            expires:5*60,
        }


})
const sendVerificationEmail=async(emailId,otp)=>{

        try{    

            const mailResponse=await maileSender(emailId,"Verification Email from Study Notion ",otp);
            console.log("Email sent successfully",mailResponse); 



        }catch(err){

            console.log("Error: ",err.message);
        }


}

otpSchema.pre("save",async(next)=>{

    await sendVerificationEmail(this.emailId,this.otp);
    next();


})




module.exports=mongoose.model("Otp",otpSchema)