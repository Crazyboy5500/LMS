import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Lists = ({ user }) => {
  const [data, setData] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const navigate = useNavigate();

  const [filter, setfilter] = useState({
    search: "-",
  });

  const handleInputs = (e) => {
    setfilter({ ...filter, [e.target.name]: e.target.value });
    console.log(filter);
  };

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

  const fetchData = async () => {
    let search = filter.search;
    if (search.length === 0) {
      search = "-";
    }

    const response = await axios.get(`http://localhost:5000/search/${search}`);
    if (response.length === 0) {
      response = await axios.get(`http://localhost:5000/allBook`);
    }
    setData(response.data.books);
  };

  useEffect(() => {
    let delayTimer;
    const handleFilterChange = () => {
      clearTimeout(delayTimer);
      delayTimer = setTimeout(fetchData, 1500);
    };

    handleFilterChange();

    return () => {
      clearTimeout(delayTimer);
    };
  }, [filter]);

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
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

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const record = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordPerPage);
  const number = [...Array(npage + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        boxShadow: "1px 1px 21px -3px rgba(0,0,0,10.75)",
        flexDirection: "column",
        justifyContent: "center",
        margin: "1rem",
        borderRadius: "1.5rem",
        padding: "0.5rem",
        backgroundColor: "#7899B7",
      }}
    >
      {data.length > 0 ? (
        <>
          <div
            className="login-field"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <input
              type="text"
              className="login-input"
              placeholder="Search Books"
              name="search"
              style={{
                width: "40%",
                fontSize: "1.2rem",
                textAlign: "center",
                fontWeight: "600",
                color: "white",
              }}
              onChange={(e) => handleInputs(e)}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <table
              className="table"
              style={{
                width: "80%",
                margin: "0 auto",
                fontSize: "1.2rem",
                borderCollapse: "separate", // Ensures borders show correctly
                borderSpacing: "0 10px", // Adds space between rows
              }}
            >
              <thead style={{ backgroundColor: "#2C3E50", color: "white" }}>
                <tr>
                  <th style={{ width: "5rem", textAlign: "center" }}>#</th>
                  <th style={{ width: "15rem", textAlign: "center" }}>Name</th>
                  <th style={{ width: "15rem", textAlign: "center" }}>
                    Publisher
                  </th>
                  <th style={{ width: "15rem", textAlign: "center" }}>Genre</th>
                  <th style={{ width: "15rem", textAlign: "center" }}>
                    Add To Cart
                  </th>
                </tr>
              </thead>
              <tbody>
                {record.map((d, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid #ccc", // Line separation
                      transition: "transform 0.3s ease-in-out", // Smooth zoom effect
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <td style={{ textAlign: "center" }}>
                      {(currentPage - 1) * 10 + i + 1}
                    </td>
                    <td
                      style={{
                        cursor: "pointer",
                        padding: "0.5rem",
                        textAlign: "center",
                        fontWeight: "600", // Optional: Make the text bold
                      }}
                      onClick={() => handleBookClick(d.Title)}
                    >
                      {d.Title}
                    </td>
                    <td style={{ padding: "0.5rem", textAlign: "center" }}>
                      {d.Author}
                    </td>
                    <td style={{ padding: "0.5rem", textAlign: "center" }}>
                      {d.Genre}
                    </td>
                    <td
                      style={{
                        padding: "0.5rem",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <input
                        type="checkbox"
                        onChange={(e) => handleCheckboxChange(e, d.ISBN)}
                        checked={selectedBooks.includes(d.ISBN)}
                        style={{ transform: "scale(1.5)" }}
                      />
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
            }}
          >
            <div
              className="land-button"
              style={{ cursor: "pointer" }}
              onClick={addToCart}
            >
              <a
                className="landing-button-hover"
                style={{
                  width: "20rem",
                  fontSize: "1.2rem",
                }}
              >
                <span>PROCEED TO CHECKOUT</span>
              </a>
            </div>
            <div style={{ marginLeft: "1.5rem", fontSize: "1.1rem" }}>
              Save Selected Item To Cart And Proceed To Checkout
            </div>
          </div>
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

export default Lists;
