import React, { useEffect, useState } from "react";
import "../product_page.scss";
import Product from "../product/Product";

import axios from "../axios";

const New_arrievel = () => {
  let [filter, setFilter] = useState({
    fromPrice: 0,
    toPrice: 500000,
  });

  const [dataSet, setData] = useState([]);
  const [error, setError] = useState("");
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

  const onSet = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getApiData();
  }, []);
  return (
    <div className="product-page-container">
      <form className="rate-filter-form">
        <h5>Filter price</h5>
        <span className="from-price">
          {" "}
          <h6>From</h6>{" "}
          <input
            type="number"
            name="fromPrice"
            id="fromPrice"
            placeholder="Ex - 10000"
            onChange={onSet}
          />
        </span>
        <span className="to-price">
          <h6>To</h6>
          <input
            type="number"
            name="toPrice"
            id="toPrice"
            placeholder="Ex - 50000"
            onChange={onSet}
          />
        </span>
      </form>
      <hr className="horizontal-line" />
      <h4>New Arrievel</h4>
      <div className="products-container">
        {error != "" ? (
          <h6>{error}</h6>
        ) : (
          dataSet
            .filter((e) => e.productModel === "new-arrivel")
            .map((ele) => {
              return (
                <>
                  {ele.realPrice >= filter.fromPrice &&
                  ele.realPrice <= filter.toPrice ? (
                    <Product
                      pName={ele.productName}
                      rPrice={ele.realPrice}
                      tPrice={ele.tempPrice}
                      pImg={ele.productImg}
                      pDiscount={ele.productDiscount}
                      pId={ele._id}
                      stars={ele.productRating}
                      pModel={ele.productModel}
                    />
                  ) : (
                    ""
                  )}
                </>
              );
            })
        )}
      </div>

      {filter.fromPrice > filter.toPrice ? <h6>Invalid filteration!</h6> : ""}
    </div>
  );
};

export default New_arrievel;
