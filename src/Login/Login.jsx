import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const [user, setUser] = useState({
    
    email: "",
    password: "",
    
  });
  function getUser(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  async function submitLogin(e) {
    e.preventDefault();
    setIsLoading(true);

    let validResult = validateLoginForm(user);

    if (validResult.error) {
      setIsLoading(false);
      setErrorList(validResult.error.details);
    } else {
      let { data } = await axios.post(
        "http://route-egypt-api.herokuapp.com/signin",
        user
      );
      if (data.message === "success") {
        localStorage.setItem('userToken', data.token)
        setIsLoading(false);
        props.getUserData();
        navigate('/home');
      } else {
        setError(data.message);
        setIsLoading(false);
      }
    }
  }
  function validateLoginForm(user) {
    let schema = Joi.object({
     
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      
    });
    return schema.validate(user, { abortEarly: false });
  }
  return (
    <div>
      <h2 className="my-3 text-center">Login now</h2>

      {errorList.map((error, index) => {
        if (index === 4) {
          return (
            <div key={index} className="alert alert-danger">
              password invalid
            </div>
          );
        } else {
          return <div key={index} className="alert alert-danger">
            {error.message}
          </div>;
        }
      })}

      {error ? <div className="alert alert-danger">{error}</div> : ""}

      <form onSubmit={submitLogin}>
        
        <label htmlFor="email">Email :</label>
        <input
          onChange={getUser}
          type="text"
          className="form-control my-2"
          name="email"
          id="email"
        />

        <label htmlFor="password">Password :</label>
        <input
          onChange={getUser}
          type="password"
          className="form-control my-2"
          name="password"
          id="password"
        />

       
        <button type="submit" className="btn btn-outline-info mt-3">
          {isLoading ? (
            <i className="fas fa-spinner fa--spin"></i>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
