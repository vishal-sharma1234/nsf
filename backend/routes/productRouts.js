const express = require("express");
const router = express.Router();
const {createProduct, displayData, addToCart, createUser, loginUser, getCartData, deleteProduct, placeOrder, sendEmail} = require("../controller/productController");




exports = router.route("/createproduct/new").post(createProduct);
exports = router.route("/createuser/new").post(createUser);
exports = router.route("/loginuser").post(loginUser);
exports = router.route("/displaydata").post(displayData);
exports = router.route("/getcartdata").post(getCartData);
exports = router.route("/deleteproduct").post(deleteProduct);
exports = router.route("/placeorder").post(placeOrder);
exports = router.route("/sendemail").post(sendEmail);
exports = router.route("/addToCart/new").post(addToCart);



module.exports = router;