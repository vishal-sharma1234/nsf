import React, { useState } from "react";
import "./contact.scss";
import {  useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate()
  let [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    password : "",
    cPassword : ""
  });

  const onSet = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch("http://localhost:5000/api/v1/createuser/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if(data.success){
      alert(data.success);
      navigate("/login");

    }else{
      alert(data.error)
    }

  };

  return (
    <div className="contact-container">
      <h1>Contact</h1>
      <h6>Contact us</h6>
      <p className="contact-number">
        Phone No. : <a href="#">8078649462</a>
      </p>
      <p className="email-id">
        Email : <a href="#">vishalsharma807864@gmail.com</a>
      </p>


      {
        !localStorage.getItem("userWebToken")?(<form action=""  onSubmit={handleSubmit}>
        <div>
          <input
          required = {true}
          type="text"
          autoComplete="new-email"
          name="name"
          id="name"
          placeholder="Name *"
          onChange={onSet}
          />{" "}
          <input
          autoComplete="new-email"
          required = {true}
          type="email"
          name="email"
          id="email"
          placeholder="Email * "
          onChange={onSet}
          />
        </div>
        <div>
          <input
            type="number"
            required = {true}
            autoComplete="new-email"
            name="contact"
            maxLength={10}
            minLength={10}
            id="number"
            placeholder="Mob. *"
            onChange={onSet}
            />

          <div>

          <input
            required = {true}
            type="password"
            name="password"
            id="password"
            maxLength={12}
            minLength={8}
            placeholder="password *"
            onChange={onSet}
            />
          <input
            type="password"
            name="cPassword"
            required = {true}
            id="cpassword"
            // maxLength={12}
            // minLength={8}
            onChange={onSet}
            placeholder="Confirm password *"
            />
          </div>
        </div>

        <textarea
        autoComplete="off"
        rows="10"
        required = {true}
        id="comment"
        class="text-area "
        name="address"
          placeholder="Address *"
          data-gtm-form-interact-field-id="0"
          onChange={onSet}
        ></textarea>
        <input id="submit" type="submit" value="Send" />
      </form>):( <h5>Welcome ! {localStorage.getItem("userEmail")} 😎</h5> )
      }

      
    </div>
  );
};

export default Contact;
