const nodemailer = require('nodemailer');
var fs = require("fs");
var handlebars = require('handlebars');
module.exports = (obj) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASSWORD
        }
    });
    fs.readFile(__dirname + '/varification.html', (err, html) => {
        if (err) {
            console.log(err);
        } else {
            var template = handlebars.compile(html.toString());
            url = "http://localhost:3000/user/verified/" + obj._id;
            var data = { "url": url };
            var result = template(data);
            let mailOption = {
                from: process.env.MAIL,
                to: obj.email,
                subject: 'verification for  user',
                html: result
            };
            transporter.sendMail(mailOption, (err, obj) => {
                if (err) {
                    return new Error("error while sending the mail");
                } else {
                    return "verification link is sent to your mail id";
                }
            });
        }
    });
}