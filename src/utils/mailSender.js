const nodeMailer=require("nodemailer");
require("dotenv").config()
const maileSender=async(emailId,title,body)=>{

        try{
            const transporter=nodeMailer.createTransport({
                    host:process.env.HOST_NAME,
                    auth:{
                        user:process.env.USER_MAIL,
                        pass:process.env.MAIL_PASS,
                    }

            })
            const info=await transporter.sendMail({
                from:`StudyNotion-by harshit`, 
                to:`${emailId}`,
                subject:`${title}`,
                html:`${body}`
               
            })
            console.log(info);




        }catch(err){
              console.log('Error: ',err.message);  
        }

    

}


module.exports=maileSender;