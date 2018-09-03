module.exports = {
    RegisterData: (checkBody, validationErrors, body) => {
        checkBody('name').notEmpty().withMessage("name field can't be empty").len(process.env.MIN, process.env.MAX).withMessage("name length should be between 2 to 10 character");
        checkBody('password').notEmpty().withMessage("password feild can't be empty").len(process.env.MIN, process.env.MAX).withMessage("password length should be between 2 to 10 character");
        checkBody("email").notEmpty().withMessage("please provide email").isEmail().withMessage("please enter valid form of emial");
        let errors = validationErrors();
        if (errors) {
            let msg = "";
            errors.forEach((error) => {
                msg = msg + error.msg + " ";
            });
            return new Error(msg);
        } else {
            return body;
        }
    },
    loginData: (checkBody, validationErrors, body) => {
        checkBody("email").notEmpty().withMessage("please provide email").isEmail().withMessage("please provide valid format  of email");
        checkBody("password").notEmpty().withMessage("please provide password").len(process.env.MIN, process.env.MAX).withMessage("password length should be between 2 to 10 character");
        let errors = validationErrors();
        if (errors) {
            let msg = "";
            errors.forEach((error) => {
                msg = msg + error.msg + " ";
            });
            return new Error(msg);
        } else {
            return body;
        }
    },
    addressData:(checkBody,validationErrors,body)=>{
        checkBody('address').notEmpty().withMessage("please provide your home address");
        checkBody('pincode').notEmpty().withMessage("please enter pincode");
        checkBody('city').notEmpty().withMessage("please enter your city name");
        checkBody('state').notEmpty().withMessage("please enter your state");
        let errors = validationErrors();
        if(errors){
            let msg="";
            errors.forEach((error)=>{
                msg=msg+error.msg+" ,";
            });
            return new Error(msg);
        }else{
            return body;
        }
    }
}