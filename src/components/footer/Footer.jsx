import React, { useState } from "react";
import "./footer.scss";
import { Link, useNavigate } from "react-router-dom";
import toast , {Toaster} from "react-hot-toast";


const Footer = () => {
  const navigate = useNavigate();
  const [email , setEmail] = useState({
    email : "",
  });

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/v1/sendemail",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(email)
    })

    const resData = await res.json();
    if(resData.success){
        toast.success("Email send successfully!");
    }else{
      toast.error(resData.message , "!");
    }


  }

  const onSet = (e)=>{
      setEmail({
        ...email,
        [e.target.name] : e.target.value,
      })
  }

  return (
    <div className="footer">
      <footer className="container">
        <div className="footer-first-container">
          <h4>Bed Room</h4>
          <div className="footer-first-products product-name-container ">
            <p className="beds">
              <Link to="/bed-room/bed">Beds</Link>
            </p>
            <p className="mettresses">
              <Link to="/bed-room/mattress">Mattresses</Link>
            </p>
          </div>
        </div>
        <div className="footer-second-container">
          <h4>Living Room</h4>
          <div className="footer-second-products product-name-container ">
            <p className="l-shape">
              <Link to="/living-room/l-shape">L Shape</Link>
            </p>
            <p className="u-shape">
              <Link to="/living-room/u-shape">U Shape</Link>
            </p>
            <p className="sectional-sofas">
              <Link to="/living-room/sectional-sofa">Sectional Sofas</Link>
            </p>
            <p className="three+1+1">
              <Link to="/living-room/3+1+1">Three+1+1</Link>
            </p>
            <p className="stationary-sofas">
              <Link to="/living-room/stationary-sofa">Stationary Sofas</Link>
            </p>
          </div>
        </div>
        <div className="footer-third-container">
          <h4>Chairs</h4>
          <div className="footer-third-products product-name-container ">
            <p className="round-chairs">
              <Link to="/chairs/round-chair">Round Chairs</Link>
            </p>
            <p className="high-back-chairs">
              <Link to="/chairs/high-back-chair">High Back Chairs</Link>
            </p>
            <p className="dining-chairs">
              <Link to="/chairs/dining-chair">Dining Chairs</Link>
            </p>
          </div>
        </div>
        <div className="footer-fourth-container">
          <h4>More Info.</h4>
          <div className="footer-fourth-products product-name-container ">
            <p className="privacy-policy">
              <Link to="/more-info/privacy-policy">Privacy Policy</Link>
            </p>
            <p className="terms-of-use">
              <Link to="/more-info/terms-of-use">Terms Of Use</Link>
            </p>
            <p className="shipping-delivery">
              <Link to="/more-info/shipping-delivery">Shipping & Delivery</Link>
            </p>
            <p className="payment-security">
              <Link to="/more-info/payment-security">Payment & Security</Link>
            </p>
          </div>
        </div>
        <div className="footer-fivth-container">
          <h4>News</h4>
          <div className="footer-fivth-products  ">
            <form action="" 
              onSubmit={handleSubmit}
            >
              <input type="email" name="email" required = {true} autoComplete="new-email" onChange={onSet} placeholder="Enter your email address" className="email" />
              <br />

              <Toaster/>

              <input type="submit" value="Tap here"  />
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
