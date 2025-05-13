const mongoose=requre("mongoose");


const connectDB=async()=>{

    await mongoose.connect(process.env.DATABSE_URL)


}

module.exports=connectDB;