import { Button } from "bootstrap";
import "../Assets/css/login.css";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [showComponent1, setShowComponent1] = useState(true);

  const [user, setUser] = useState({});

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };
  const submitForm = async () => {
    await axios
      .post(`http://localhost:5000/register`, user)
      .then((response) => {
        var message = response.data.msg;
        var status = response.status;
        console.log(message);

        if (status === 200) {
          toast.success(`${message}`, {
            position: "top-center",
            autoClose: 2000,
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            draggable: true,
            textAlign: "center",
          });
          setTimeout(() => {
            window.location.href = "/signin";
          }, 1500);
        } else if (status === 202) {
          toast.warn(`${message}`, {
            position: "top-center",
            autoClose: 2000,
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            draggable: true,
            textAlign: "center",
          });
        }
      });
  };

  const img1 =
    "https://github.com/AnuragRoshan/images/blob/main/23.jpg?raw=truecd c ";
  return (
    <div className="login-top">
      <div
        className="login-inner-top-left"
        style={{ padding: "3rem 3rem 3rem 3rem" }}
      >
        <div className="login-title">CATlib</div>
        <div className="login-title-below">Register Your Account</div>
        <div className="login-signup-call">
          Already Have Account ? <a href="/signin">SignIn</a>
        </div>
        <div className="login-form">
          <div class="login-field">
            <i class="login-icon fas fa-user"> </i>
            <input
              type="text"
              class="login-input"
              name="name"
              placeholder="Your Name"
              onChange={(e) => handleInputs(e)}
            />
          </div>
          <div class="login-field">
            <i class="login-icon fas fa-user"> </i>
            <input
              name="username"
              type="text"
              class="login-input"
              placeholder="Email"
              onChange={(e) => handleInputs(e)}
            />
          </div>
          <div class="login-field">
            <i class="login-icon fas fa-user"> </i>
            <input
              type="text"
              class="login-input"
              name="phone"
              placeholder="Your Phone Number"
              onChange={(e) => handleInputs(e)}
            />
          </div>
          <div class="login-field ">
            <input
              type="password"
              class="login-input"
              placeholder="Password"
              name="password"
              onChange={(e) => handleInputs(e)}
            />
          </div>
          <div className="land-button">
            <div
              className="landing-button-hover"
              style={{ marginBlockStart: "0rem", cursor: "pointer" }}
              onClick={() => submitForm()}
            >
              <span>SignUp</span>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
      <div className="login-inner-top-right">
        <div>
          <img
            className="login-img"
            src="https://raw.githubusercontent.com/AnuragRoshan/images/a74c41aa0efd44c9239abed96d88a5ffd11ffe7f/undraw_friendship_mni7.svg"
            alt=""
            srcset=""
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
