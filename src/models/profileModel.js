const mongoose=require("mongoose");


const profileModelSchema=mongoose.Schema({


        gender:{
            enum:["male","female","others"]
        },
        dateOfBirth:{
            type:String,
        },
        about:{
            type:String,
            trim:true,
        },
        contactNumber:{
            type:Number,
            trim:true,
        }


})




module.exports=mongoose.model("Profile",profileModelSchema)