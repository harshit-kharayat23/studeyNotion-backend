const Course=require("../models/course");
const Tag=require("../models/tag");
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

        }catch(err){
           return res.status(500).json({
                success:false,
                message:"Error: "+err.message
            })
        }





}
