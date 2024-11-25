import React from "react";
import BorrowBanner from "./BorrowBanner";
import BorrowList from "./BorrowList";
const Borrower = () => {
  return (
    <div style={{ paddingBlockStart: "4rem" }}>
      <BorrowBanner />
      <BorrowList />
    </div>
  );
};

export default Borrower;
