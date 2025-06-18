const SubSection = require("../models/subSection");
const Section = require("../models/section");
const uploadImageToCloudinary = require("../utils/imageUploader");
require("dotenv").config();

exports.createSubSection = async (req, res) => {
  try {
    const { title, description, sectionId, timeDuration } = req.body;
    const video = req.files.videoFile;
    if (!title || !description || !video || !timeDuration || !sectionId) {
      return res.status(404).json({
        success: false,
        message: "All Fields are required",
      });
    }

      // upload video to cloudinary
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME,
      );
      // create subsection
      const subSectionDetails = await SubSection.create({
        title: title,
        timeDuration: timeDuration,
        videoUrl: uploadDetails.secure_url,
        description: description,
      });

      //
      const updateSection = await Section.findByIdAndUpdate(
        { sectionId },
        {
          $push: {
            subSection: subSectionDetails._id,
          },
        },
        { new: true }
      );

      return res.status(200).json({
        success:true,
        message:"Subsection Created Successfully",
        updateSection,
      })
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: " + err.message,
    });
  }
};


exports.updateSubSection=async(req,res)=>{

        try{

            const {subSectionId,title, description,timeDuration}=req.body;
            const video = req.files.videoFile;

             // upload video to cloudinary
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME,
            );
            const updatedSubSection=await SubSection.findByIdAndUpdate({subSectionId},{title,description,timeDuration,videoUrl:uploadDetails.secure_url},{new:true})
            return res.status(200).json({
                success: true,
                message: "SubSection updated successfully",
                });


        }catch(err){
                return res.status(500).json({
                success: false,
                message: "Error: " + err.message,
                });
        }

}