import nodemailer from "nodemailer";

//SEND EMAIL FUNCTION
const sendEmail = (toEmail:string , emailSubject:string , emailMessage:string) =>{
    //create transporter to send emails via Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    //define email options
    const mailOptions = {
        from : 'CareerConnect <aina.isaac2002@gmail.com>',
        to:toEmail,
        subject:emailSubject,
        text:emailMessage

    };

    //Send the Email
    transporter.sendMail(mailOptions,function(error, info){
        if(error){
            console.log(error)
        }else{
            console.log('Email sent:' + info.response)
        }
    })
}


export default sendEmail;