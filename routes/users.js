var express = require('express');
var router = express.Router();
var User = require("../model/user");
var dataValidation = require("../data_validation/validation");
/* GET users listing. */
router.post('/register', async (req, res, next) => {
  let result = await dataValidation.RegisterData(req.checkBody, req.validationErrors, req.body);
  if (result instanceof Error) {
    res.status(400).json({ error: 1, message: result.message });
  } else {
    let user = new User({ name: result.name, email: result.email, passowrd: result.passowrd });
    let error = user.validateSync();
    if (error) {
      res.status(400).json({ error: 1, message: error.message });
    } else {
      user.save((err, obj) => {
        if (err) {
          res.status(500).json({ error: 1, message: err.message });
        } else {
          res.status(200).json({ error: 1, message: "successfully register", data: obj });
        }
      })
    }
  }

});

module.exports = router;
