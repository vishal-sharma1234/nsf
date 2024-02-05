const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    user:{
        type : String,
        default : "#user not exist?"
    },
    productName : {
        type : String,
        required : true
    },
    productId :{
        type : String,
        required : true
    },
    productSize : {
        type : String,
        required : true
    },
    productModel : {    
        type :String,
        required : true
    },
    productPrice : {
        type : Number,
        required : true
    },
    pTempPrice : {
        type : Number,
        required : true
    },
    productQty : {
        type : Number,
        required : true
    },
    productImg : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = new mongoose.model("cartdata",cartSchema);