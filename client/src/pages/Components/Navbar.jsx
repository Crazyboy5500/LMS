import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Assets/css/navbar.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate("/home");
  };

  const handleRecentlyAddedClick = () => {
    navigate("/profile");
  };

  const handelCart = () => {
    if (user.userType === "user") {
      navigate("/cart");
    } else {
      navigate("/borrower");
    }
  };

  const handleLogout = async () => {
    await axios
      .post(`http://localhost:5000/logout`, null, {
        withCredentials: true,
      })
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
            window.location.href = "/";
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

  // Function to determine whether a link should be underlined
  const isLinkActive = (path) => location.pathname === path;

  return (
    <div>
      <div className="nav-top">
        <div className="nav-inner-top">
          <div>
            <div
              onClick={handleHomeClick}
              style={{
                fontSize: "2.4rem",
                marginRight: "25rem",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              CATlib
            </div>
          </div>
          <div className="nav-inner-element">
            <div
              className={`linked ${
                isLinkActive("/home") ? "underline-link" : ""
              }`}
              onClick={handleHomeClick}
            >
              Books
            </div>
          </div>
          <div className="nav-inner-element">
            <div
              className={`linked ${
                isLinkActive("/borrower") || isLinkActive("/cart")
                  ? "underline-link"
                  : ""
              }`}
              onClick={handelCart}
            >
              {user.userType === "user" ? "Cart" : "Borrower"}
            </div>
          </div>
          <div className="nav-inner-element">
            <div
              className={`linked ${
                isLinkActive("/profile") ? "underline-link" : ""
              }`}
              onClick={handleRecentlyAddedClick}
            >
              Profile
            </div>
          </div>
          <div className="nav-inner-element">
            <div
              className={`linked ${isLinkActive("/") ? "underline-link" : ""}`}
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
