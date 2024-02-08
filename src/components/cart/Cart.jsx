import React, { useEffect, useState } from "react";
import "./cart.scss";
import { Link } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
import  {toast , ToastContainer } from "react-toastify";

import Cartcomponent from "../cartcomponent/Cart";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  let totalPrice = 0;
  let gst = 0;
  let shippingCharge = 0;
  let subTotal = 0;

  const getApiCartData = async () => {
    const res = await fetch("http://localhost:5000/api/v1/getcartdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: localStorage.getItem("userEmail"),
      }),
    });
    const data = await res.json();

    console.log(data.data);
    setCartData(data.data);

    localStorage.setItem("cartLength", data.data.length);
  };

  const placeOrder = async () => {
    if (cartData.length <= 0) {
      if (localStorage.getItem("userWebToken")) {
        // alert("Your cart is empty");
        toast.error("Your cart is empty!");
      } else {
        // alert("You ar'nt loggedin!, Please login.....😕");
        toast.error("You ar'nt loggedin!, Please login.....😕!");
      }
    } else {
      const res = await fetch("http://localhost:5000/api/v1/placeorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: localStorage.getItem("userEmail"),
          orderArrayOfProduct: cartData,
          subTotalPayment: subTotal,
        }),
      });
      const resJson = await res.json();
      // console.log(resJson);

      
      toast.success(
        "Order pandding after payment successfull then your order condfirmed!"
      );
      localStorage.setItem("cartLength", 0);
      window.location.reload();
    }
  };

  useEffect(() => {
    getApiCartData();
  }, []);

  return (
    <div className="big-cart-container">
      
      <div className="cart-dt">
        {localStorage.getItem("userWebToken") ? (
          cartData.length > 0 ? (
            cartData.map((e) => {
              totalPrice += e.productPrice * e.productQty;
              return (
                <Cartcomponent
                  pImg={e.productImg}
                  pName={e.productName}
                  pSize={e.productSize}
                  pQty={e.productQty}
                  realPrice={e.productPrice}
                  tempPrice={e.pTempPrice}
                  pId={e._id}
                />
              );
            })
          ) : (
            <h3>Your Cart Is Empty! 😕</h3>
          )
        ) : (
          <h3>You ar'nt loggedin!, Please login.....😕</h3>
        )}
      </div>
      <div className="product-estimate-container">
        <div className="total-price-container">
          <h6>Total</h6>
          <h5>Rs. {totalPrice}</h5>
        </div>
        <div className="gst-container">
          <h6>GST 18%</h6>
          <h5>Rs. {(gst = totalPrice * (18 / 100))}</h5>
        </div>
        <div className="shipping-charge-container">
          <h6>Shipping charge</h6>
          <h5>
            Rs.{" "}
            {totalPrice > 35000
              ? (shippingCharge = 500)
              : (shippingCharge = 3000)}
          </h5>
        </div>
        <div className="subtotal-container">
          <h4>Subtotal Price</h4>
          <h3>Rs. {(subTotal = totalPrice + gst + shippingCharge)}</h3>
        </div>

        <button className="buy-product" onClick={placeOrder}>
          Buy now
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;
