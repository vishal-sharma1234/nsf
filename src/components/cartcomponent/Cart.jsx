import React, { useEffect } from "react";
import sofa from "../home/sofa.jpg";
import { useDispatch } from "react-redux";

const Cart = (props) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    // console.log(props);
    const res = await fetch("http://localhost:5000/api/v1/deleteproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pId: props.pId,
      }),
    });

    const result = await res.json();
    // console.log(result)

    window.location.reload();
    dispatch({ type: "cartLengthDecrease" });
  };

  return (
    <>
      <div className="cart-data-container">
        <div className="product-cart-container">
          <img src={props.pImg} alt="product image here" className="product-image" />
          {/* <img src={sofa} alt="product image here" className="product-image" /> */}
          <div className="product-details">
            <h5 className="product-name">{props.pName}</h5>
            <div className="product-price-container">
              <code className="temp-price">Rs. {props.tempPrice}/-</code>
              <code className="real-price">Rs. {props.realPrice}/-</code>
            </div>
            <code className="product-size">{props.pSize}</code>
          </div>
        </div>
        <div className="delivery-date-qty-container">
          <h6>delivery date</h6>
          <p>qty {props.pQty}</p>
        </div>
        <div className="remove-movetofav-container">
          <p
            className="remove-item"
            onClick={handleDelete}
            style={{
              cursor: "pointer",
            }}
          >
            Remove
          </p>
          <p>|</p>
          <p
            className="move-to-fav-item"
            style={{
              cursor: "pointer",
            }}
          >
            Move to fav
          </p>
        </div>
      </div>
    </>
  );
};

export default Cart;
