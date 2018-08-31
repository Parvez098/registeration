var express = require('express');
var router = express.Router();
var User = require("../model/user");
var dataValidation = require("../data_validation/validation");
var sendMail = require("../mail_send/mailSend");
var md5 = require("md5");
var passport = require("passport");
var LocalStrategy = require("passport-local");

passport.serializeUser((user, done) => {
    return done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
        if (err) {
            return done(null, false);
        } else {
            return done(null, user);
        }
    });
})
passport.use(new LocalStrategy({
        usernameField: "email",
        passReqToCallback: true
    },
    (req, username, password, done) => {
        User.findOne({ email: username }, (err, obj) => {
            if (err) {
                return done(null, false, req.flash('message', 'mongodb internel problem'));
            } else {
                if (obj != null) {
                    if (obj.password === md5(password)) {
                        if (obj.verified == true) {
                            return done(null, obj);
                        } else {
                            return done(null, false, req.flash('message', 'your email id is not verified'));
                        }
                    } else {
                        return done(null, false, req.flash('message', 'your password is not matched'));
                    }
                } else {
                    return done(null, false, req.flash('message', 'your email id is not matched'));
                }
            }
        })
    }
))

router.post('/register', async(req, res, next) => {
    let result = await dataValidation.RegisterData(req.checkBody, req.validationErrors, req.body);
    if (result instanceof Error) {
        res.status(400).json({ error: 1, message: result.message });
    } else {
        let user = new User({ name: result.name, email: result.email, password: md5(result.password) });
        let error = user.validateSync();
        if (error) {
            res.status(400).json({ error: 1, message: error.message });
        } else {
            user.save(async(err, obj) => {
                if (err) {
                    res.status(500).json({ error: 1, message: err.message });
                } else {
                    let result = await sendMail(obj);
                    if (result instanceof Error) {
                        res.status(500).json({ error: 1, message: result.message });
                    } else {
                        res.status(200).json({ status: 1, message: "successfully register and verification link is sent to your mail", data: obj });
                    }
                }
            })
        }
    }
});

router.get('/verified/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $set: { verified: true } }, { new: true }, (err, obj) => {
        if (err) {
            res.status(404).json({ error: 1, message: "your id is not matched " });
        } else {
            res.status(200).json({ status: 1, message: "user verified", data: obj });
        }
    })
})

router.post('/login', passport.authenticate('local', { failureRedirect: 'fail', failureFlash: true }), (req, res) => {
    res.status(200).json({ status: 1, message: "successfully login", data: req.user });
});

router.get('/fail', (req, res) => {
    console.log(req.user);
    res.status(400).json({ error: 1, message: req.flash('message') });
})
module.exports = router;