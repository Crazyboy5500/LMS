import React, { useEffect, useState } from "react";
import "../../Assets/css/profile.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const EditProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [data, setData] = useState({
    name: "",
    username: "",
    phone: "",
    address: "",
    uniqueId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/userDetail/${id}`);
        setUser(response.data);
        setData({
          name: response.data.name,
          username: response.data.username,
          phone: response.data.phone,
          address: response.data.address,
          uniqueId: response.data.uniqueId,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputs = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    try {
      await axios.post(`http://localhost:5000/updateUser`, data);
      toast.success("Profile updated successfully", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        textAlign: "center",
      });
      setTimeout(() => {
        window.location.href = "/home";
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        textAlign: "center",
      });
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Display a loading indicator while fetching user data
  }

  const dateStr = user.createdAt;
  const date = new Date(dateStr);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div style={{ paddingBlockStart: "4rem",backgroundColor:"#A4BFBA" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>
          <div
            style={{
              margin: "1rem",
              borderRadius: "2rem",
              backgroundColor: "#3d5a80",
              padding: "1rem",
              boxShadow: "1px 1px 21px -3px rgba(0,0,0,10.75)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                }}
              />
            </div>
            <img
              style={{
                width: "15rem",
                borderRadius: "50%",
                margin: "1rem 0",
              }}
              src="https://api.multiavatar.com/Starcrasher.png?apikey=dIwKHchoCn6x9k"
              alt="Avatar"
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
              Joined on{" "}
              <span style={{ color: "#a0a2a1" }}>{formattedDate}</span>
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
              <span style={{ color: "yellow" }}> {user.cart.length} </span>{" "}
              items in{" "}
              <a
                style={{ color: "#539cda", textDecoration: "none" }}
                href="/cart"
              >
                cart
              </a>
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
                Edit Profile
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
                />
                <span onClick={submitForm} className="profile-button">
                  Update
                </span>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
