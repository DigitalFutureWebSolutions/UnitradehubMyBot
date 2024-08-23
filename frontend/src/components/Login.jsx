import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";

function Login({ setLoggedIn }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("https://unitrade-hub.vercel.app/api/v1/api-login", values)
        .then((res) => {
          if (res.data.success === true) {
            setLoggedIn(true); // Set the loggedIn state to true
            navigate("/home"); // Navigate to the home page
          } else {
            alert("No Record Exist"); // Display an alert if the user doesn't exist
          }
        })
        .catch((err) => {
          console.error("API Error:", err);
          // Handle specific errors, such as invalid credentials by
          if (err.response && err.response.status === 400) {
            alert("Invalid email or password. Please try again.");
          } else {
            alert("An error occurred. Please try again later.");
          }
        });
    }
  };

  return (
    <div className="bg-black flex justify-center">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
            <div className="absolute px-4 z-10">
              <div className="top-[20px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
                <div className="px-4 py-2 items-center space-x-2">
                  <h1
                    className="px-4 py-2 items-center space-x-2"
                    style={{ fontSize: 37, textAlign: "center" }}
                  >
                    Login
                  </h1>
                </div>
                <div className="d-flex justify-content-center align-items-center padding-top">
                  <div className="bg-white p-3 rounded w-80">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="email" style={{ color: "black" }}>
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          placeholder="Enter Email"
                          name="email"
                          className="form-control rounded-0"
                          onChange={handleInput}
                        />
                        {/* {errors.email && (
                          <span className="text-danger">{errors.email}</span>
                        )} */}
                      </div>
                      <div className="mb-4">
                        <label htmlFor="password" style={{ color: "black" }}>
                          <strong>Password</strong>
                        </label>
                        <input
                          type="password"
                          placeholder="Enter Password"
                          name="password"
                          className="form-control rounded-0"
                          onChange={handleInput}
                        />
                        {/* {errors.password && (
                          <span className="text-danger">{errors.password}</span>
                        )} */}
                      </div>

                      <button
                        type="submit"
                        className="btn btn-success w-100 rounded-0"
                      >
                        Login
                      </button>
                      <p
                        style={{
                          color: "red",
                          fontFamily: "sans-serif",
                          fontSize: "12px",
                          float: "left",
                        }}
                      >
                        You agree to our terms and policies
                      </p>
                      <Link
                        to="/signup"
                        className="btn btn-default border w-100 rounded-0 text-decoration-none"
                      >
                        Create Account
                      </Link>
                    </form>
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
