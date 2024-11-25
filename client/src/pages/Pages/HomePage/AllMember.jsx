import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllMember = ({ user }) => {
  const [data, setData] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const navigate = useNavigate();

  //handle clicks
  // console.log(user);
  const addToCart = async () => {
    const books = selectedBooks;
    const username = user.username;
    const send = { books: books, username: username };
    console.log(send);
    await axios
      .post(`http://localhost:5000/addToCart`, send, {})
      .then((response) => {
        console.log(response);
      });
    setTimeout(() => {
      window.location.href = "/cart";
    }, 500);
  };
  // console.log(selectedBooks);

  const fetchData = async () => {
    // setInterval(async () => {
    const response = await axios.get("http://localhost:5000/allUser");
    setData(response.data);
    // }, 1500);
  };
  // console.log(data);
  useEffect(() => {
    fetchData();
  }, []);

  const handleBookClick = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedBooks((prevSelectedBooks) => [...prevSelectedBooks, id]);
    } else {
      setSelectedBooks((prevSelectedBooks) =>
        prevSelectedBooks.filter((bookId) => bookId !== id)
      );
    }
    console.log(selectedBooks);
  };

  //variables
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const record = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordPerPage);
  const number = [...Array(npage + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage != npage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        // border: "1px solid grey",
        boxShadow: "1px 1px 21px -3px rgba(0,0,0,10.75)",
        flexDirection: "column",
        justifyContent: "center",
        margin: "1rem",
        borderRadius: "1.5rem",
        padding: "0.5rem",
      }}
    >
      {data.length > 0 ? (
        <>
          <div>
            {/* <img
              className="vert-move"
              style={{
                width: "40%",
                marginLeft: "30%",
                // marginRight: "50%",
                // height: "30%",
              }}
              src="https://raw.githubusercontent.com/AnuragRoshan/images/3847f7937af6b50213195fa6db1a49f5e3194e21/undraw_team_page_re_cffb.svg"
              alt=""
              srcset=""
            /> */}
          </div>

          <div
            style={{
              justifyContent: "center",
              paddingInline: "1rem",
              marginBlockStart: "1rem",
            }}
          >
            <table className="table">
              <thead style={{ backgroundColor: "#3d5a80", color: "white" }}>
                <th style={{ width: "5rem", textAlign: "left" }}>#</th>
                <th style={{ width: "15rem", textAlign: "left" }}>Name</th>
                <th style={{ width: "15rem", textAlign: "left" }}>UID</th>
                <th style={{ width: "15rem", textAlign: "left" }}>email</th>
                <th style={{ width: "15rem", textAlign: "left" }}>Phone</th>
                <th style={{ width: "15rem", textAlign: "left" }}>Status</th>
              </thead>
              <tbody>
                {record.map((d, i) => (
                  <tr>
                    <td style={{}}>{(currentPage - 1) * 10 + i + 1}</td>
                    <td
                      style={{ cursor: "pointer", padding: "0.5rem" }}
                      onClick={() => handleBookClick(d.uniqueId)}
                      key={i}
                    >
                      {d.name}
                    </td>
                    <td style={{ padding: "0.5rem" }}>{d.uniqueId}</td>
                    <td style={{ padding: "0.5rem" }}>{d.username}</td>
                    <td style={{ padding: "0.5rem" }}>{d.phone}</td>
                    <td style={{ padding: "0.5rem" }}>
                      {d.borrowed.length == 0 ? (
                        <>Not Borrowed</>
                      ) : (
                        <>Borrowed</>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            style={{
              textAlign: "center",
              marginBlockStart: "2rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              className="land-button lists-button"
              style={{ margin: "0 1rem", padding: "0", cursor: "pointer" }}
              onClick={prevPage}
            >
              <a
                className="landing-button-hover"
                style={{ width: "5rem", margin: "10px" }}
              >
                <span>PREV</span>
              </a>
            </div>

            <div style={{ paddingBlockStart: "1rem" }}>{currentPage}</div>
            <div
              className="land-button"
              style={{ margin: "0 1rem", padding: "0", cursor: "pointer" }}
              onClick={nextPage}
            >
              <a
                className="landing-button-hover"
                style={{ width: "5rem", margin: "10px" }}
              >
                <span>NEXT</span>
              </a>
            </div>
          </div>
          <div
            style={{
              marginLeft: "45rem",
              // marginBlockEnd: "2rem",
            }}
          ></div>
        </>
      ) : (
        <div className="loaders book">
          <figure className="page"></figure>
          <figure className="page"></figure>
          <figure className="page"></figure>
        </div>
      )}
    </div>
  );
};
export default AllMember;
