const mongoose = require("mongoose");
const emailSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    data : {
        type : Date,
        default : Date.now
    }
})

module.exports = new mongoose.model("email" , emailSchema); 