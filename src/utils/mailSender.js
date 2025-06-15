const nodeMailer=require("nodemailer");
require("dotenv").config()
const mailSender=async(emailId,title,body)=>{

        try{
            const transporter=nodeMailer.createTransport({
                    host:process.env.HOST_NAME,
                    auth:{
                        user:process.env.USER_MAIL,
                        pass:process.env.MAIL_PASS,
                    }

            })
            const info=await transporter.sendMail({
                from:`StudyNotion -by harshit`, 
                to:`${emailId}`,
                subject:`${title}`,
                html:`${body}`
               
            })
            console.log(info);
            return info;




        }catch(err){
              console.log('Error: ',err.message);  
        }

    

}


module.exports=mailSender;