import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import sofa from "./sofa.jpg";
// import sofa2 from "./sofa2.jpg";
import "./home.scss";
import Product from "../product/Product";

const Home = () => {
  const [dataSet, setData] = useState([]);

  let cartLengthItem = localStorage.getItem("cartLength");

  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/api/v1/displaydata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home-page">
      <div className="top-container"></div>
      <div className="mid-container  ">
        <div className="new-arrivel-products">
          <h5>new arrievel</h5>
          <div className="products">
            
            <div>
              {dataSet != [] ? (
                dataSet
                  .filter((e) => e.productModel === "new-arrivel")
                  .map((ele) => {
                    return (
                      <Product
                        pName={ele.productName}
                        rPrice={ele.realPrice}
                        tPrice={ele.tempPrice}
                        pImg={ele.productImg}
                        pDiscount={ele.productDiscount}
                        pId = {ele._id}
                        pModel = {ele.productModel}
                        pQty = {1}
                        stars = {ele.productRating}
                        />
                        );
                      })
                      ) : (
                <h1>hello</h1>
                )}
            </div>
          </div>
          <Link to="/new-arrivel">show more</Link>
        </div>
        <div className="bed-room-products">
          <h5>Bed room</h5>
          <div className="products">
            <div>
              {dataSet != [] ? (
                dataSet
                .filter((e) => e.productModel === "bed-room")
                .map((ele) => {
                  return (
                    <Product
                    pName={ele.productName}
                    rPrice={ele.realPrice}
                    tPrice={ele.tempPrice}
                    pImg={ele.productImg}
                    pDiscount={ele.productDiscount}
                    pId = {ele._id}
                    stars = {ele.productRating}
                    pModel = {ele.productModel}
                    />
                    );
                  })
                  ) : (
                <h1>hello</h1>
                )}
            </div>
          </div>
          <Link to="/bed-room">show more</Link>
        </div>
        <div className="pillows-products">
          <h5>Pillows</h5>
          <div className="products">
            <div>
              {dataSet != [] ? (
                dataSet
                .filter((e) => e.productModel === "pillows")
                .map((ele) => {
                  return (
                    <Product
                    pName={ele.productName}
                    rPrice={ele.realPrice}
                    stars = {ele.productRating}
                    tPrice={ele.tempPrice}
                    pImg={ele.productImg}
                    pDiscount={ele.productDiscount}
                    pId = {ele._id}
                    pModel = {ele.productModel}
                    />
                    );
                  })
                  ) : (
                    <h1>hello</h1>
                    )}
            </div>
          </div>
          <Link to="/pillows">show more</Link>
        </div>
        <div className="living-room-products">
          <h5>Living room</h5>
          <div className="products">
            <div>
              {dataSet != [] ? (
                dataSet
                .filter((e) => e.productModel === "living-room")
                .map((ele) => {
                  return (
                    <Product
                    pName={ele.productName}
                    rPrice={ele.realPrice}
                    tPrice={ele.tempPrice}
                    stars = {ele.productRating}
                    pImg={ele.productImg}
                    pDiscount={ele.productDiscount}
                    pId = {ele._id}
                    pModel = {ele.productModel}
                    />
                    );
                  })
                  ) : (
                    <h1>hello</h1>
              )}
            </div>
          </div>
          <Link to="/living-room">show more</Link>
        </div>
        <div className="chair-products">
          <h5>Chair</h5>
          <div className="products">
            <div>
              {dataSet != [] ? (
                dataSet
                .filter((e) => e.productModel === "chair")
                .map((ele) => {
                  return (
                    <Product
                    pName={ele.productName}
                    rPrice={ele.realPrice}
                    tPrice={ele.tempPrice}
                    pImg={ele.productImg}
                    stars = {ele.productRating}
                    pDiscount={ele.productDiscount}
                    pId = {ele._id}
                    pModel = {ele.productModel}
                    />
                    );
                  })
                  ) : (
                    <h1>hello</h1>
                    )}
            </div>
          </div>
          <Link to="/chair">show more</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

