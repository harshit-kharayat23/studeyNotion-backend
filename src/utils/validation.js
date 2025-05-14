const validator=require("validator")


const validation=(req)=>{

    
    const {firstName,lastName,emailId,password,confirmPassword}=req.body;

    if(firstName<3 || firstName>=30){
        throw new Error("lastName is not valid!");
    }
    if(lastName<3 || lastName>=30){
        throw new Error("firstName is not valid!");
    }

    if(!validator.isEmail(emailId)){
        throw new Error("EmailId is not valid!");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password is not valid!")
    }
    if(password!==confirmPassword){
                throw new Error("confirmPassword does not match with current Password!")
    }
    


}


module.exports=validation;