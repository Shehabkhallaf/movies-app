import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: "",
    repeat_password: "",
  });
  function getUser(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  async function submitRegister(e) {
    e.preventDefault();
    setIsLoading(true);

    let validResult = validateRegisterForm(user);

    if (validResult.error) {
      setIsLoading(false);
      setErrorList(validResult.error.details);
    } else {
      let { data } = await axios.post(
        "http://route-egypt-api.herokuapp.com/signup",
        user
      );
      if (data.message === "success") {
        setIsLoading(false);
        navigate('/login');
      } else {
        setError(data.message);
        setIsLoading(false);
      }
    }
  }
  function validateRegisterForm(user) {
    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(8).required(),
      last_name: Joi.string().alphanum().min(3).max(8).required(),
      age: Joi.number().min(16).max(90).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeat_password: Joi.ref("password"),
    });
    return schema.validate(user, { abortEarly: false });
  }
  return (
    <div>
      <h2 className="my-3 text-center">Register now</h2>

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

      <form onSubmit={submitRegister}>
        <label htmlFor="first_name">First Name :</label>
        <input
          onChange={getUser}
          type="text"
          className="form-control my-2"
          name="first_name"
          id="first_name"
        />

        <label htmlFor="last_name">last Name :</label>
        <input
          onChange={getUser}
          type="text"
          className="form-control my-2"
          name="last_name"
          id="last_name"
        />

        <label htmlFor="age">Age :</label>
        <input
          onChange={getUser}
          type="number"
          className="form-control my-2"
          name="age"
          id="age"
        />

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

        <label htmlFor="repeat_password">Repeat Password :</label>
        <input
          onChange={getUser}
          type="password"
          className="form-control my-2"
          name="repeat_password"
          id="repeat_password"
        />

        <button type="submit" className="btn btn-outline-info mt-3">
          {isLoading ? (
            <i className="fas fa-spinner fa--spin"></i>
          ) : (
            "Rregister"
          )}
        </button>
      </form>
    </div>
  );
}
