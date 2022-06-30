import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bolder" to="home">
          NOXE
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {props.userData ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="movies">
                    Movies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="network">
                    Network
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center me-3">
              <i className="fab fa-instagram mx-2"></i>
              <i className="fab fa-facebook mx-2"></i>
              <i className="fab fa-twitter mx-2"></i>
              <i className="fab fa-youtube mx-2"></i>
            </li>
            {props.userData ? (
              <>
                <li className="nav-item">
                  <span onClick={props.logOut} className="nav-link">
                    Log out
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
