const productModel = require("../models/products");
const cartModel = require("../models/addToCart");
const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");
const sendEmailModel = require("../models/sendEmailModel");
const jwt = require("jsonwebtoken");
const secretKey = "thisismyproject";



// Send Email

exports.sendEmail = async (req,res,next)=>{

  const {email} = req.body;
    // console.log(email);
  const findEmail = await sendEmailModel.findOne({email : email});

  if(findEmail){
    res.status(202).json({
      success : false,
      message : "Email is already added!",
    })
  }else{
    const data = await sendEmailModel.create(req.body);
  res.status(202).json({
    success : true,
    data
  })
  }


 
}


// sign up user

exports.createUser = async (req, res, next) => {
  let { password, cPassword } = req.body;
  if (password === cPassword) {
    let data = await userModel.create(req.body);
    res.status(202).json({
      success: true,
      data,
    });
  } else {
    res.status(404).json({
      success: false,
      error: "password missmatched!",
    });
  }
};

// login user

exports.loginUser = async (req, res, next) => {
  let { password, email } = req.body;
  const user = await userModel.find({ email: email });
  const userObj = user[0];
  // console.log(userObj);
  if (userObj) {
    if (password === userObj.password) {
      let userId = {
        id: userObj._id,
      };

      let userEmail = userObj.email;
      let userType = userObj.userType;

      let cartLength = await cartModel.find({user : userEmail});
      let length = cartLength.length;
      // console.log(length);

      let userWebToken = jwt.sign(userId, secretKey  );
      res.status(202).json({
        success: true,
        userObj,
        userWebToken,
        userEmail,
        userType,
        length
      });
    } else {
      res.status(404).json({
        message: "Please fill detail carefully!",
      });
    }
  } else {
    res.status(404).json({
      message: "Please fill detail carefully!",
    });
  }
};

exports.createProduct = async (req, res, next) => {
  let data = await productModel.create(req.body);

  res.status(202).json({
    success: true,
    data,
  });

  // console.log(data);
};

exports.addToCart = async (req, res, next) => {
  // console.log(req.body)
  const { productId, user } = req.body;
  const query = {
    productId: productId,
    user : user
  }
  const findData = await cartModel.findOne({
    productId: productId,
    user: user,
  });


  // console.log(findData);
  let cartLength = await cartModel.find({user : user});
  let length = cartLength.length;

  if (!findData) {
    let data = await cartModel.create(req.body);

    
    // console.log(length);

    res.status(202).json({
      success: true,
      data,
      length
    });
  }else{
    const newData = await cartModel.findOneAndUpdate(query, { $set: req.body})
    res.status(202).json({
      message: "update",
      newData,
      length
    });
  }


};

// cart data find get API

exports.getCartData = async (req, res, next) => {
  const { userEmail } = req.body;
  let data = await cartModel.find({ user: userEmail });
  if (data) {
    res.status(202).json({
      data,
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { pId } = req.body;

  // console.log(req.body)

  const product = await cartModel.find({ _id: pId });

  const result = await cartModel.deleteOne({ _id: product[0]._id });

  res.status(202).json({
    success: true,
    result,
  });
};

exports.displayData = async (req, res, next) => {
  try {
    res.send(global.completeData);
  } catch (error) {
    console.log(error.message);
    res.send("server error");
  }
};



//  O R D E R    C O N F I R M

exports.placeOrder = async (req,res,next)=>{

  const {user , orderArrayOfProduct , subTotalPayment}  = req.body;
  // console.log(user);
  
  const data = await orderModel.create(req.body);
  

  const deleDt = await cartModel.deleteMany({user : user});

  res.status(202).json({
    success : true,
    data,
    deleDt,
  })


}