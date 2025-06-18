const Section=require("../models/section")
const Course=require("../models/course")

exports.createSection=async(req,res)=>{

    try{
        // data fetch
        const {sectionName,courseId}=req.body;
        //data validate
        if(!sectionName ||!courseId ){
            return res.status(404).json({
            success:false,
            message:"All fields are required",
        })
        }
        
        // create section
        const newSection=new Section({
            sectionName,

        })
        await newSection.save();
        // update section Object Id in course schema
        const updateCourseDetails=await Course.findByIdAndUpadte({_id:courseId},{
            $push:{
                courseContent:newSection,
            }
        },{new:true});

        return res.status(200).json({
            success:true,
            message:"Section created successfully",
        })


    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error: "+err.message,
        })
    }
        



}


exports.updateSection=async(req,res)=>{

        try{

            const {sectionName,sectionId}=req.body;
            if(!sectionName ||!sectionId ){
                        return res.status(404).json({
                        success:false,
                        message:"All fields are required",
                    })
             }

            const updatedData=await Section.findByIdAndUpadte({sectionId},{sectionName},{new:true})
             

            return res.status(200).json({
                success:true,
                message:"Section updated successfully",
                updatedData,
        })

        }catch(err){

            return res.status(500).json({
            success:false,
            message:"Error: "+err.message,
        })
        }

}

exports.deleteSection=async(req,res)=>{

        try{
            const {sectionId}=req.params;

            const deleteSection=await Section.findByIdAndDelete({sectionId});
            return res.status(200).json({
                success:true,
                message:"Section deleted successfully",
                updatedData,
        })


        }catch(err){

            return res.status(500).json({
            success:false,
            message:"Error: "+err.message,


        })
    }


}