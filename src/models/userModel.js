const mongoose=require("mongoose");
const { isLowercase } = require("validator");


const userModelSchema=mongoose.Schema({

        firstName:{
            type:String,
            required:true,
            trim:true,

        },
        lastName:{
            type:String,
            required:true,
            trim:true,

        },
        emailId:{
            type:String,
            required:true,
            trim:true,
            

        },
        password:{
            type:String,
            required:true,

        },
        confirmPassword:{
            type:String,
            required:true,
        },
        accountType:{
            type:String,
            lowercase:true,
            enum:["student","admin","instructor"],
            required:true,
        },
        additionalDetails:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Profile",

        },
        courses:[{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Course",
        }],
        image:{
            type:String,
            
        },
        courseProgress:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress",
        },
        token:{
            type:String,

        },
        resetPasswordExpires:{
            type:Date,
        }




})



module.exports=mongoose.model("User",userModelSchema)