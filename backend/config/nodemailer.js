// const nodemailer = require("nodemailer");

// const trasporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "devanshiballar1611@gmail.com",
//     pass: "hlzh hytt ejvd qnsm",
//   },
// });

// console.log(trasporter);
// async function sendData(to, subject, html, otp) {
//   const mailFormat = {
//     from: "devanshiballar1611@gmail.com",
//     to: to,
//     subject: subject,
//     html: html,
//     otp,
//   };
//   await trasporter.sendMail(mailFormat, (err, info) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Sent mail");
//     }
//   });
// }
// module.exports = sendData;


const nodemailer=require("nodemailer")

const transPorter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: "devanshiballar1611@gmail.com",
        pass: "hlzh hytt ejvd qnsm",
    }
})


async function senData(to,subject,otp){
    const mailFormat={
        from:"devanshiballar1611@gmail.com",
        to:to,
        subject:subject,
        html:`Your Forgot password Otp ${otp}`
    }
    await transPorter.sendMail(mailFormat, (err,info)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("send mail");
        }
    })
}
module.exports=senData