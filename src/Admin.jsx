import React, { useState } from "react";
import "./admin.scss";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Admin = () => {

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    realPrice: "",
    tempPrice: "",
    productSize: "",
    productQty: "",
    productDiscount: 0,
    productModel: "",
    productRating: 4,
    productReview: 5,
    productImg: "",
    productDescription: "",
  });

  const onSet = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const createProduct = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/v1/createproduct/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const data = await res.json();
    if (data.success) {
      toast.success("product created successfully!");
      navigate("/");
    } else {
      alert("find some error please chacked out once!");
    }
  };

  return (
    <div className="big-container-admin">
      <Toaster />
      <h6>Create New Product</h6>

      {localStorage.getItem("userWebToken") ? (
        localStorage.getItem("userType") === "admin" ? (
          <form
            action=""
            className="createProduct-admin-form"
            onSubmit={createProduct}
          >
            <input
              type="text"
              name="productName"
              id="productName"
              placeholder="Product name"
              onChange={onSet}
              required={true}
              autoComplete="off"
            />
            <div className="temp-real-price-container">
              <input
                required={true}
                onChange={onSet}
                type="number"
                name="realPrice"
                id="realPrice"
                placeholder="Real price"
              />
              <input
                type="number"
                required={true}
                onChange={onSet}
                name="tempPrice"
                id="tempPrice"
                placeholder="Temp price"
              />
            </div>
            <input
              type="text"
              required={true}
              autoComplete="off"
              onChange={onSet}
              name="productSize"
              id="productSize"
              placeholder="Product size"
            />
            <div className="qty-discount-container">
              <input
                required={true}
                onChange={onSet}
                type="number"
                name="productQty"
                id="productQty"
                placeholder="Product quantity"
              />
              <input
                required={true}
                onChange={onSet}
                type="number"
                name="productDiscount"
                id="productDiscount"
                placeholder="Product discount"
              />
            </div>
            <input
              required={true}
              type="text"
              onChange={onSet}
              name="productModel"
              autoComplete="off"
              id="productModel"
              placeholder="Product Model"
            />
            <div className="rating-review-container">
              <input
                required={true}
                type="number"
                onChange={onSet}
                name="productRating"
                id="productRating"
                placeholder="Product rating"
              />
              <input
                type="number"
                required={true}
                name="productReview"
                onChange={onSet}
                id="productReview"
                placeholder="Product review"
              />
            </div>
            <input
              type="text"
              onChange={onSet}
              name="productImg"
              required={true}
              autoComplete="off"
              id="productImg"
              placeholder="Product imgae"
            />
            <textarea
              name="productDescription"
              id="productDescription"
              autoComplete="off"
              required={true}
              onChange={onSet}
              cols="30"
              rows="10"
              placeholder="Product description"
            ></textarea>
            <input type="submit" id="submit" />
          </form>
        ) : (
          <h6>You ar'nt admin!</h6>
        )
      ) : (
        <h6>Please login!</h6>
      )}
    </div>
  );
};

export default Admin;
