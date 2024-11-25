import React from "react";

const Banner = ({ user }) => {
  return (
    <div className="home-banner">
      {user.userType == "user" ? (
        <>Books Available In Our Inventory</>
      ) : (
        <>List Of Active Members Of Library</>
      )}
    </div>
  );
};

export default Banner;
