const mongoose =require("mongoose");
const mailSender=require("../utils/mailSender")

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

            const mailResponse=await mailSender(emailId,"Verification Email from Study Notion ",otp);
            console.log("Email sent successfully",mailResponse); 



        }catch(err){

            console.log("Error Occured by sending mails: ",err.message);
        }


}

otpSchema.pre("save",async(next)=>{

    await sendVerificationEmail(this.emailId,this.otp); 
    next();


})




module.exports=mongoose.model("Otp",otpSchema)