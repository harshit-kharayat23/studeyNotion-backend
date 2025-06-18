const Tag=require("../models/tag")


exports.createCategory=async(req,res)=>{

    try{
    
        const {name,description}=req.body;
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required.."
            })
        }

        const tagDetails=new Tag({
            name,
            description,
        })
        await tagDetails.save();
        console.log(tagDetails);


            return res.status(201).json({
                success: true,
                message: "Tag created successfully.",
                tag: tagDetails,
                });




    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error:"+err.message,
        })
    }


}


exports.showAllCategory=async(req,res)=>{

    try{
        const allTags=await Tag.find({},{name:true,description:true});

        return res.status(201).json({
            success:true,
            message:"All tags returned successfully",
        })

        
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error: "+err.message
        })
    }

}