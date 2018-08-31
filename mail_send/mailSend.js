const nodemailer = require('nodemailer');

module.exports = (obj) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'parvez@excellencetechnologies.in',
            pass: '1nherit5'
        }
    });
    let mailOption = {
        from: 'parvez@excellencetechnologies.in',
        to: obj.email,
        subject: 'verification for  user',
        text: "http://localhost:3000/user/verified/" + obj._id
    };
    transporter.sendMail(mailOption, (err, obj) => {
        if (err) {
            return new Error("error while sending the mail");
        } else {
            return "verification link is sent to your mail id";
        }
    });
}