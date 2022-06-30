import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import About from "./About/About";
import Movies from "./Movies/Movies";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Network from "./Network/Network";
import Notfound from "./Notfound/Notfound";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
function App() {
  let navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if(localStorage.getItem('userToken')){
      getUserData();
    }
  }, []);

  function getUserData() {
    let decodedToken = jwtDecode(localStorage.getItem("userToken"));
    setUserData(decodedToken);
  }

  useEffect(() => {
  }, [userData]);

  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("login");
  }
  function ProtectedRoute({children}){
    if(!localStorage.getItem('userToken')){
     return <Navigate to='/login' />
    }else{
      return children
    }
  }
  return (
    <div>
      <Navbar userData={userData} logOut={logOut} />
      <div className="container">
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
          <Route path="login" element={<Login getUserData={getUserData} />} />
          <Route path="register" element={<Register />} />
          <Route path="network" element={<ProtectedRoute><Network /></ProtectedRoute>} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
