import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import HomePage from "./pages/Pages/HomePage/HomePage"
import SignIn from "./pages/LoginSingup/SignIn.jsx";
import SignUp from "./pages/LoginSingup/SignUp.jsx";
import Profile from "./pages/Pages/Profile/Profile";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./pages/Components/Navbar";
import LandingPage from "./pages/Pages/LandingPage";
import Cart from "./pages/Pages/Cart/Cart";
import EditProfile from "./pages/Pages/Profile/EditProfile"
import Borrower from "./pages/Pages/Cart/Borrower";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/logedinuser/`, { withCredentials: true });
      setUser(data.user);
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Router>
        {user && <Navbar user={user} />}
        {!isLoading && (
          <Routes>
            <Route
              exact
              path="/"
              element={user ? <Navigate to="/home" /> : <LandingPage />}
            />
            <Route
              exact
              path="/home"
              element={user ? <HomePage user={user} /> : <SignIn />}
            />
            <Route
              exact
              path="/signup"
              element={user ? <Navigate to="/home" /> : <SignUp />}
            />
            <Route
              exact
              path="/signin"
              element={user ? <Navigate to="/home" /> : <SignIn />}
            />
            <Route
              exact
              path="/cart"
              element={user ? <Cart user={user} /> : <Navigate to="/home" />}
            />
            <Route
              exact
              path="/profile"
              element={user ? <Profile user={user} /> : <Navigate to="/home" />}
            />
            <Route
              exact
              path="/edit/:id"
              element={user ? <EditProfile user={user} /> : <Navigate to="/home" />}
            />
            <Route
              exact
              path="/borrower"
              element={user ? <Borrower user={user} /> : <Navigate to="/home" />}
            />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
