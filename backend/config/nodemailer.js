const nodemailer=require("nodemailer")

const transPorter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: "devanshiballar1611@gmail.com",
        pass: "hlzh hytt ejvd qnsm",
    }
})


async function senData(to,subject,html){
    const mailFormat={
        from:"devanshiballar1611@gmail.com",
        to:to,
        subject:subject,
        html:html,
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