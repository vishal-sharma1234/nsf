import React from 'react'
import "./product.scss"
import sofa from "../home/sofa.jpg";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';




const Product = ( props ) => {
  const {pName , pDiscount , rPrice , tPrice , pImg ,pId , pModel , pQty } = props;
  const dispatch = useDispatch();

  const pClick = ()=>{
      dispatch({
        type : "pClick",
        // payload : pQty
      })
      // alert("hello everyone")
  }
  return (
    // <Link to={`/${pId}`} className='product-card'  onClick={()=>pUrl()} >
     <Link to={`/product-detail/${pId}`} className='product-card' onClick={()=>pClick()} > 
                <img src={pImg} alt="image-first" />
                <p>{pDiscount}% off</p>
                <span className="review-stars">
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star "></span>
                  <code>4</code>
                </span>

                <small>{pName}</small>
                <span>
                  {" "}
                  <code className="temp-price"> Rs. {tPrice}/-  </code>{" "}
                  <code className="real-price"> Rs. {rPrice}/- </code>{" "}
                </span>
        </Link>
  )
}

export default Product