import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Validation from "./LoginValidation";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log("Input Values:", values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    console.log("Validation Errors:", validationErrors);

    // Temporarily bypass validation to test submission
    // if (Object.keys(validationErrors).length === 0) {
    axios
      .post("https://unitradehub-1.onrender.com/api/v1/api-register", values)
      .then((res) => {
        console.log("Server Response:", res);
        navigate("/"); // Redirect to the login page upon successful signup
      })
      .catch((err) => console.log("Axios Error:", err));
    // }
  };

  return (
    <div className="bg-black flex justify-center">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
            <div className="absolutepx-4 z-10">
              <div className="top-[20px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
                <div className="px-4 py-2 items-center space-x-2">
                  {/* <img src={rupees} alt="" className="mx-auto w-40 h-40" /> */}
                </div>
                <div className="px-4 py-2 items-center space-x-2">
                  <h1
                    className="px-4 py-2 items-center space-x-2"
                    style={{ fontSize: 37, textAlign: "center" }}
                  >
                    SignUp
                  </h1>
                </div>
                <div className="d-flex justify-content-center align-items-center padding-top">
                  <div className="bg-white p-3 rounded w-80">
                    <form action="" onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="name" style={{ color: "black" }}>
                          <strong>Name</strong>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Name"
                          name="name"
                          onChange={handleInput}
                          className="form-control rounded-0"
                        />
                        {errors.name && (
                          <span className="text-danger"> {errors.name}</span>
                        )}
                      </div>
                      <div className="mb-4">
                        <label htmlFor="email" style={{ color: "black" }}>
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          placeholder="Enter Email"
                          name="email"
                          onChange={handleInput}
                          className="form-control rounded-0"
                        />
                        {errors.email && (
                          <span className="text-danger"> {errors.email}</span>
                        )}
                      </div>
                      <div className="mb-4">
                        <label htmlFor="password" style={{ color: "black" }}>
                          <strong>Password</strong>
                        </label>
                        <input
                          type="password"
                          placeholder="Enter Password"
                          name="password"
                          onChange={handleInput}
                          className="form-control rounded-0"
                        />
                        {/* {errors.password && (
                          <span className="text-danger">{errors.password}</span>
                        )} */}
                      </div>

                      <button
                        type="submit"
                        className="btn btn-success w-100 rounded-0"
                      >
                        Signup
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
                        to="/"
                        className="btn btn-default border w-100 rounded-0 text-decoration-none"
                      >
                        Login
                      </Link>
                    </form>
                  </div>
                </div>
                <div className="tasks">
                  <div className="px-4 mt-6 flex justify-between gap-2"></div>
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

export default Signup;
