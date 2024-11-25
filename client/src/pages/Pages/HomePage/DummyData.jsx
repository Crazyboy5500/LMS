import React from "react";

const DummyData = () => {
  return (
    <div
      style={{
        margin: "1rem",
        backgroundColor: "#3d5a80",
        height: "10rem",
        borderRadius: "2rem",
        display: "flex",
        flexDirection: "row",
        padding: "1rem",
      }}
    >
      <div className="dummy-inner-box" style={{}}>
        <div>
          <img
            style={{ width: "8rem" }}
            src="https://raw.githubusercontent.com/AnuragRoshan/images/8d4745ca737a0e4a2307509f7d5ebbb994cf7158/undraw_sharing_knowledge_03vp.svg"
            alt=""
            srcset=""
          />
        </div>
        <div style={{ padding: "1rem", width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: "4rem", fontWeight: "bolder" }}>42 </div>
          <div>Borrowed</div>
        </div>
      </div>
      <div className="dummy-inner-box" style={{}}>
        <div>
          <img
            style={{ width: "8rem" }}
            src="https://raw.githubusercontent.com/AnuragRoshan/images/8d4745ca737a0e4a2307509f7d5ebbb994cf7158/undraw_receipt_re_fre3.svg"
            alt=""
            srcset=""
          />
        </div>
        <div style={{ padding: "1rem", width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: "4rem", fontWeight: "bolder" }}>16 </div>
          <div>Overdues</div>
        </div>
      </div>
      <div className="dummy-inner-box" style={{}}>
        <div>
          <img
            style={{ width: "8rem" }}
            src="https://raw.githubusercontent.com/AnuragRoshan/images/8d4745ca737a0e4a2307509f7d5ebbb994cf7158/undraw_new_entries_re_cffr.svg"
            alt=""
            srcset=""
          />
        </div>
        <div style={{ padding: "1rem", width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: "4rem", fontWeight: "bolder" }}>148 </div>
          <div>New Members</div>
        </div>
      </div>
      <div
        className="dummy-inner-box"
        style={{
          marginRight: "0",
        }}
      >
        <div>
          <img
            style={{ width: "8rem" }}
            src="https://raw.githubusercontent.com/AnuragRoshan/images/8d4745ca737a0e4a2307509f7d5ebbb994cf7158/undraw_real_time_analytics_re_yliv.svg"
            alt=""
            srcset=""
          />
        </div>
        <div style={{ padding: "1rem", width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: "4rem", fontWeight: "bolder" }}>542 </div>
          <div>Visitors</div>
        </div>
      </div>
    </div>
  );
};

export default DummyData;
