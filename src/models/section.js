const mongoose=require("mongoose");
const subsection = require("./subsection");


const sectionModelSchema=mongoose.Schema({


       sectionName:{
        type:String,
       },
       subSection:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"SubSection",
       },



 


})




module.exports=mongoose.model("Section",sectionModelSchema)