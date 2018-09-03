var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var addressSchema = new Schema({
    address: String,
    pincode: Number,
    city: String,
    state: String
});


module.exports = mongoose.model('Address', addressSchema);