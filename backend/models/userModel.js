const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userType : {
        type : String,
        default : "user"
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    cPassword : {
        type : String,
        required : true
    },
    contact : {
        type : Number,
        required : true,
        min : 1111111111,
        max : 9999999999
    },
    address : {
        type : String,
        required : true
    }
});
module.exports = new mongoose.model("user",userSchema);