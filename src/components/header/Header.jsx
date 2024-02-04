import React from "react";

import { Link, useNavigate } from "react-router-dom";

import { GiSofa } from "react-icons/gi";
import { MdOutlineShoppingCart } from "react-icons/md";
import "./Header.scss";
import { useSelector } from "react-redux";


const Header = () => {

  // let cartLengthItem = localStorage.getItem("cartLength");
  let {cartLength} = useSelector((state) => state.custom);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userWebToken");
    localStorage.removeItem("userEmail");
    // navigate("/contact");
  };

  return (
    <div className="header-navbar">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <GiSofa /> <b style={{ fontFamily: "fantasy" }}>NSF</b>{" "}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/new-arrivel">
                  New Arrievel
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/bed-room">
                  Bed Room
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pillows">
                  Pillows
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/living-room">
                  Living Room
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chair">
                  Chair
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                {!localStorage.getItem("userWebToken") ? (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                ) : (
                  <Link className="nav-link" onClick={handleLogout} to="/login">
                    Logout
                  </Link>
                )}
              </li>

              {localStorage.getItem("userWebToken") ? (
                localStorage.getItem("userType") === "admin" ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admindashboard">
                      DashBoard
                    </Link>
                  </li>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </ul>
            <span className="navbar-text">
              <Link to="/cart" className="shopping-cart">
                  {
                    localStorage.getItem("userWebToken") ? <p>{cartLength}</p> : <p>{0}</p>
                  }
                <MdOutlineShoppingCart />
              </Link>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
