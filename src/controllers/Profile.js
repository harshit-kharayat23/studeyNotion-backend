const User=require("../models/userModel")
const Profile=require("../models/profileModel")

exports.updateProfile=async(req,res)=>{

    try{

        const {dateOfBirth="",about="",contactNumber,gender}=req.body
        const id=req.user._id;;

        const userDetails=await User.findById(id);
        const profileId=await Profile.findById(userDetails.additionalDetails);
        const profileDetails=await Profile.findById(profileId);
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.contactNumber=contactNumber;
        profileDetails.gender=gender;

        await profileDetails.save();
        return res.status(200).json({
            success:true,
            message:"Profile Updated successfully!"
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error: "+err.message,
        })
    }



}


exports.deleteAccount=async(req,res)=>{


    try{

    }catch(err){
            return res.status(500).json({
            success:false,
            message:"Error: "+err.message,
        })
    }

}