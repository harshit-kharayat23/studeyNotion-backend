const mongoose=require("mongoose");

const tagSchema=mongoose.Schema({

        name:{
            type:String,
            required:true,
            trim:true,
        },
        description:{
            type:String,
            trim:true,
        },
        course:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Course",

        }
    


})


module.exports=mongoose.model("Tag",tagSchema)