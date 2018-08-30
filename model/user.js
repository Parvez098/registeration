var mongoose = require("mongoose")
var uniqueValidator = require("mongoose-unique-validator");
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/register");
var userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, reuired: true, trim: true },
    verified: { type: Boolean, default: false }
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
