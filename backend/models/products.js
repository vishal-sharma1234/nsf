const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : true
    },
    realPrice : {
        type  : Number,
        required : true
    },
    tempPrice : {
        type : Number,
        required : true
    },
    productSize : {
        type : String,
        required : true
    },
    productDiscount : {
        type : Number,
        required : true
    },
    productDescription : {
        type : String,
        required : true
    },
    productModel : {
        type : String,
        required : true
    },
    productImg : {
        type : String,
        required : true
    },
    productQty : {
        type : Number,
        required : true
    },
    productReview : {
        type : Number,
        default :3
    },
    productRating : {
        type : Number,
        default : 10

    },

})


module.exports = mongoose.model("sofadatas",productSchema);