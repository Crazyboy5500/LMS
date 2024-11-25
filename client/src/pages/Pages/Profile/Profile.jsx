import React, { useState } from "react";
import "../../Assets/css/profile.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = ({ user }) => {
  const dateStr = user.createdAt;
  const date = new Date(dateStr);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const [data, setData] = useState({
    name: user.name,
    username: user.username,
    phone: user.phone,
    address: user.address,
    uniqueId: user.uniqueId,
  });

  const handleInputs = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const submitForm = async () => {
    await axios
      .post(`http://localhost:5000/updateUser`, data)
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
            window.location.href = "/profile";
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

  return (
    <div style={{ paddingBlockStart: "4rem",backgroundColor:"#A4BFBA",width:"100%", height:"100vh",overflow:"hidden" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "1rem",
              borderRadius: "2rem 2rem 2rem 2rem",
              backgroundColor: "#3d5a80",
              padding: "1rem",
              boxShadow: "1px 1px 21px -3px rgba(0,0,0,10.75)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  marginBottom: "1rem",
                }}
              ></div>
              <img
                style={{ width: "15rem" }}
                src="https://api.multiavatar.com/Starcrasher.png?apikey=dIwKHchoCn6x9k"
                alt="User Avatar"
              />
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "poppins",
                  marginBlockStart: "1rem",
                  fontWeight: "600",
                  fontSize: "1.5rem",
                  color: "white",
                }}
              >
                {user.name}
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "poppins",
                  marginBlockStart: "0.5rem",
                  fontWeight: "600",
                  fontSize: "1rem",
                  color: "white",
                }}
              >
                UID : <span>{user.uniqueId}</span>
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "poppins",
                  marginBlockStart: "0.5rem",
                  fontWeight: "600",
                  fontSize: "1rem",
                  color: "white",
                }}
              >
                Email : {user.username}
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "poppins",
                  marginBlockStart: "0.5rem",
                  fontWeight: "600",
                  fontSize: "1rem",
                  color: "white",
                }}
              >
                Phone : {user.phone}
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "poppins",
                  marginBlockStart: "0.5rem",
                  fontWeight: "600",
                  fontSize: "1rem",
                  color: "white",
                }}
              >
                Joined on <span style={{ color: "#a0a2a1" }}>{formattedDate}</span>
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "poppins",
                  marginBlockStart: "0.5rem",
                  fontWeight: "600",
                  fontSize: "1rem",
                  color: "white",
                }}
              >
                Nothing <span style={{ color: "#2bea2b" }}>Borrowed</span>
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "poppins",
                  marginBlockStart: "0.5rem",
                  fontWeight: "600",
                  fontSize: "1rem",
                  color: "white",
                }}
              >
                <span style={{ color: "yellow" }}> {user.cart.length} </span> items in{" "}
                <a
                  style={{ color: "#539cda", textDecoration: "none" }}
                  href="/cart"
                >
                  cart
                </a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: "3", display: "flex", flexDirection: "column" }}>
          <div>
            <div
              style={{
                margin: "1rem",
                backgroundColor: "white",
                borderRadius: "2rem",
                boxShadow: "1px 1px 21px -3px rgba(0,0,0,10.75)",
              }}
            >
              <div
                style={{
                  margin: "0.5rem",
                  display: "flex",
                  padding: "1rem 0 0 1rem",
                  fontSize: "2rem",
                  fontWeight: "600",
                  fontFamily: "poppins",
                }}
              >
                Edit Your Profile
              </div>
              <div
                style={{
                  margin: "0.5rem",
                  display: "flex",
                  padding: "0.5rem",
                }}
              >
                <input
                  style={{ width: "60%" }}
                  type="text"
                  className="login-input"
                  name="name"
                  placeholder="Name"
                  defaultValue={user.name}
                  onChange={(e) => handleInputs(e)}
                />
              </div>
              <div
                style={{
                  margin: "0.5rem",
                  display: "flex",
                  padding: "0.5rem",
                }}
              >
                <input
                  style={{ width: "60%" }}
                  type="email"
                  className="login-input"
                  name="username"
                  placeholder="Email"
                  defaultValue={user.username}
                  onChange={(e) => handleInputs(e)}
                />
              </div>
              <div
                style={{
                  margin: "0.5rem",
                  display: "flex",
                  padding: "0.5rem",
                }}
              >
                <input
                  style={{ width: "30%" }}
                  type="number"
                  className="login-input"
                  name="phone"
                  defaultValue={user.phone}
                  placeholder="Phone"
                  onChange={(e) => handleInputs(e)}
                />
              </div>
              <div
                style={{
                  margin: "0.5rem",
                  display: "flex",
                  padding: "0.5rem 0.5rem 2rem 0.5rem",
                }}
              >
                <input
                  style={{ width: "90%" }}
                  type="text"
                  className="login-input"
                  name="address"
                  placeholder="Address"
                  defaultValue={user.address}
                  onChange={(e) => handleInputs(e)}
                />
                <span onClick={submitForm} className="profile-button">
                  Update
                </span>
                <ToastContainer />
              </div>
            </div>
            <div>
              <div
                style={{
                  margin: "1rem",
                  backgroundColor: "white",
                  borderRadius: "2rem",
                  boxShadow: "1px 1px 21px -3px rgba(0,0,0,10.75)",
                }}
              >
                <div
                  style={{
                    margin: "0.5rem",
                    display: "flex",
                    padding: "1rem 0 0 1rem",
                    fontSize: "2rem",
                    fontWeight: "600",
                    fontFamily: "poppins",
                  }}
                >
                  Any Query Or Feedback?
                </div>
                <div
                  style={{
                    margin: "0.5rem",
                    display: "flex",
                    padding: "0.5rem",
                  }}
                >
                  <textarea
                    style={{ width: "100%", fontFamily: "poppins" }}
                    name="query"
                    rows="7"
                    placeholder="Enter your Query or Feedback"
                  ></textarea>
                </div>
                <div
                  style={{
                    margin: "0.5rem",
                    display: "flex",
                    padding: "1rem 1rem 1rem 0.5rem",
                    justifyContent: "flex-end",
                  }}
                >
                  <span className="profile-button">Submit</span>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
