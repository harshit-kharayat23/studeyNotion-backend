const mongoose=require("mongoose");

const courseSchema=mongoose.Schema({

    courseName:{
        type:String,
        required:true,
        trim:true,

    },
    courseDescription:{
        type:String,
        trim:true,
        required:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",

        
    },
    whatYouWillLearn:{
        type:String,

    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReviews",
    }],
    price:{
        type:Number,
    },
    thumbnail:{
        type:String,
    }
    , 
    tag:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag",
        required:true,
    },
    studentsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        }
    ]

})



module.exports=mongoose.Schema("Course",courseSchema)