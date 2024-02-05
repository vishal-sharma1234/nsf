const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user : {
    type :String,
    required : true
  },
  orderArrayOfProduct : {
    type : Array,
    required : true
  },
  subTotalPayment : {
    type : Number,
    required : true
  },
  orderDate : {
    type : Date,
    default : Date.now
  }  
})

module.exports = new mongoose.model("order",orderSchema);