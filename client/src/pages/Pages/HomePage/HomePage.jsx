import React from "react";
import Banner from "./Banner";
import "../../Assets/css/home.css";
import Lists from "./Lists";
import AllMember from "./AllMember";
import DummyData from "./DummyData";
import magic from "../../Assets/Books are.mp4";
import coupon from "../../Assets/fashion sale Banner Landscape.mp4"

const HomePage = ({ user }) => {
  return (
    <div className="home-top" style={{ paddingTop: "4rem", overflow: "hidden", backgroundColor: "#A9C4DB" }}>
      {user.userType === "user" ? (
        <>
          <div className="home-inner-top">
            <video
              src={ coupon }
              style={{ width: "100%", height:"auto", maxHeight:"550px", objectFit:"cover"}}
              autoPlay
              loop
              muted
            />
            <DummyData />
            <video
              src={ magic }
              className="video"
              style={{ width: "100%", height:"auto", maxHeight:"300px", objectFit:"cover", objectPosition: "top"}}
              autoPlay
              loop
              muted
            />
            <Banner user={user} />
            <Lists user={user} />
          </div>
        </>
      ) : (
        <>
          <div className="home-inner-top">
            <Banner user={user} />
            <DummyData />
            <AllMember user={user} />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
