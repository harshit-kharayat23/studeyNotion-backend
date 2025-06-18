const course = require("../models/course");
const Course=require("../models/course");
const Tag=require("../models/Category");
const User=require("../models/userModel"); 
const uploadImageToCloudinary = require("../utils/imageUploader");





exports.createCourse=async(req,res)=>{

        try{
            const {courseName,courseDescription,whatYouWillLearn,price,tag}=req.body;

            const thumbnail=req.files.thumbnailImage;

            if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag){
                   return  res.status(500).json({
                        success:false,
                        message:"All fields Required",
                    })
            }

            const userId=req.user._id;
            const instructorDetails=await User.findOne({userId});
            if(!instructorDetails){
                return res.status(404).json({
                    success:false,
                    message:"Instructor not found."
                })
            }
            // check if tag is vaild or not 

            const tagDetails=await Tag.findById(tag)
            if(!tagDetails){
                     return res.status(404).json({
                    success:false,
                    message:"Tag Details not found"
                })
            }
            // upload image to cloudinary
            const thumbnailImage=uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME); 

            // create an entry for new course
            const courseDetails=new Course({
                courseName,
                courseDescription,
                thumbnail:thumbnailImage.secure_url,
                tag:tagDetails._id,
                whatYouWillLearn,
                price,
                instructor:instructorDetails._id,
            })
            await courseDetails.save();
 // add new course  to user schema of instructor
            await User.findByIdAndUpdate({_id:instructorDetails._id },
                {
                    $push:{
                        courses:courseDetails._id
                } 
            },{new:true}
            )

            return res.status(200).json({
                success:true,
                message:"Course Created Successfully "
            })
           


        }catch(err){
           return res.status(500).json({
                success:false,
                message:"Error: "+err.message
            })
        }





}

exports.showAllCourses=async(req,res)=>{
    try{

        const allCourses=await Course.find({},{courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReviews:true,
            studentsEnrolled:true,
        }).populate("instructor").exec()
        if(!allCourses){
            return res.status(500).json({
                success:false,
                message:"Courses not found."
            })
        }
    return res.status(500).json({
                success:true,
                message:"Fetched all courses",
                data:allCourses,
            })




    }catch(err){
            return res.status(500).json({
                success:false,
                message:"Error: "+err.message
            })
    }
}