 const Otp=require("../models/otp")
const otpGenerator=require("otp-generator")


const generateOTP=async(emailId)=>{
                // generate otp 
            let otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })
            // unique otp
            let result=await Otp.findOne(otp);
            while(result){
                otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
                })
                result=await Otp.findOne(otp);
            }

            const otpData=new Otp({
                otp,
                emailId,
            })

            const otpBody=await otpData.save();
            console.log("OTP BODY :",otpBody)
}

module.exports=generateOTP;

