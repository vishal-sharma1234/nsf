import React, { useEffect, useState } from "react";
import "./productDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "../axios";
import sofa from "../home/sofa.jpg";
import Product from "../product/Product";
import toast, { Toaster } from "react-hot-toast";
import StarRating from "../product/StarRating";

const Product_detail = () => {
  let { pQty } = useSelector((state) => state.custom);
  const dispatch = useDispatch();
  let { id } = useParams();
  const [dataSet, setData] = useState([]);
  const [error, setError] = useState("");

  const increment = (option) => {
    
      if(pQty < option.productQuantity){
        dispatch({ type: "increment" });
      }else{
        alert(`Products only ${option.productQuantity} in stock!`)
      }

  };

  const decrement = () => {
    if(pQty > 1){
      dispatch({ type: "decrement" });
    }
  };

  const addToCart = async (option) => {
    if (localStorage.getItem("userWebToken")) {
      const res = await fetch("http://localhost:5000/api/v1/addToCart/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: option.pName,
          productId: option.pId,
          productSize: option.pSize,
          productModel: option.pModel,
          productPrice: option.pPrice,
          productQty: option.pQty,
          productImg: option.pImg,
          pTempPrice: option.pTempPrice,
          user: localStorage.getItem("userEmail"),
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("item added successfully!");
        dispatch({ type: "addToCart" });
      } else if (data.message) {
        toast.success("item added successfully!");
      } else {
        toast.error("please try again!");
      }
      console.log(data);
    } else {
      alert("You ar'nt loggedin!, Please login.....");
    }
  };

  const getApiData = async () => {
    try {
      const res = await axios.post("/displaydata");
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const placeOrder = async (option) => {
    if (localStorage.getItem("userWebToken")) {
      const res = await fetch("http://localhost:5000/api/v1/placeorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: localStorage.getItem("userEmail"),
          orderArrayOfProduct: [option],
          subTotalPayment: option.productPrice,
        }),
      });
      const resJson = await res.json();

      toast.success(
        "Order pandding after payment successfull then your order condfirmed!"
      );
    } else {
      alert("You ar'nt loggedin!, Please login.....");
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      {dataSet
        .filter((e) => e._id === id)
        .map((ele) => {
          return (
            <div className="bigContainer">
              <div className="topProductDetail-container">
                <div className="productDetail-container">
                  <img src={ele.productImg} alt="imageSofa" />
                  <div className="details">
                    <h5>{ele.productName}</h5>
                    <p className="rating"><StarRating  stars={ele.productRating} /></p>
                    <p className="productSize">
                      <code>{ele.productSize}</code>
                    </p>
                    <div className="priceContainer">
                      <code className="tempPrice-tag">
                        Rs. {ele.tempPrice}/-
                      </code>
                      <code className="realPrice-tag">
                        Rs. {ele.realPrice}/-
                      </code>
                    </div>
                    <p className="productDiscount">
                      {ele.productDiscount}% off
                    </p>

                    <div className="quantityContainer">
                      <button className="decrementQty" onClick={decrement}>
                        -
                      </button>{" "}
                      <small>{pQty}</small>{" "}
                      <button className="incrementQty" onClick={ ()=>{ increment({productQuantity : ele.productQty})}}>
                        +
                      </button>{" "}
                    </div>

                    <div className="buttonContainer">
                      <button
                        className="addToCart"
                        onClick={() =>
                          addToCart({
                            pName: ele.productName,
                            pId: ele._id,
                            pPrice: ele.realPrice,
                            pTempPrice: ele.tempPrice,
                            pModel: ele.productModel,
                            pSize: ele.productSize,
                            pQty: pQty,
                            pImg: ele.productImg,
                          })
                        }
                      >
                        Add to Cart
                      </button>
                      <Toaster />
                      <button
                        className="buy-now"
                        onClick={() =>
                          placeOrder({
                            user: ele.user,
                            productName: ele.productName,
                            productId: ele._id,
                            productSize: ele.productSize,
                            productModel: ele.productModel,
                            productPrice: ele.realPrice,
                            pTempPrice: ele.tempPrice,
                            productQty: pQty,
                            productImg: ele.productImg,
                          })
                        }
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
                <p className="productDescription">{ele.productDescription}</p>
              </div>
              <div className="slider-related-product">
                {dataSet
                  .filter((p) => p.productModel === ele.productModel)
                  .map((pEle) => {
                    return (
                      <>
                        <Product
                          pName={pEle.productName}
                          rPrice={pEle.realPrice}
                          tPrice={pEle.tempPrice}
                          pImg={pEle.productImg}
                          pDiscount={pEle.productDiscount}
                          pId={pEle._id}
                          stars={ele.productRating}
                          pModel={pEle.productModel}
                        />
                      </>
                    );
                  })}
              </div>
              <Link to={`/${ele.productModel}`} className="showMore">
                show more
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default Product_detail;
