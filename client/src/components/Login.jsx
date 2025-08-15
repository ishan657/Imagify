import React, { useEffect, useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = "hidden"; //to prevent scrolling when login form is open
    return () => {
      document.body.style.overflow = "unset"; //to reset overflow when component unmounts
    };
  }, []);
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        action=""
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2x1 text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>
        {state !== "Login" && ( //when state not equal to login this will show syntx in javascript
          <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5 ">
            <img alt="" src={assets.profile_icon} className="h-5 opacity-50" />
            <input
              type="text"
              placeholder="Full Name"
              required
              className="ouline-none text-sm"
            />
          </div>
        )}
        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
          <img alt="" src={assets.email_icon} className="" />
          <input
            type="text"
            placeholder="Email id"
            required
            className="outline-none text-sm"
          />
        </div>
        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5 ">
          <img alt="" src={assets.lock_icon} className="" />
          <input
            type="password"
            placeholder="Password"
            required
            className="outline-none text-sm"
          />
        </div>
        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot password?
        </p>
        <button className="bg-blue-600 w-full text-white py-2 rounded-full">
          {state === "Login" ? "Login" : "create account"}
        </button>
        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-600 cursor-pointer"
            >
              {" "}
              Sign up
            </span>
          </p>
        ) : (
          // simple ternary operator
          <p className="mt-5 text-center">
            Already have a account?
            <span
              onClick={() => setState("Login")}
              className="text-blue-600 cursor-pointer"
            >
              {" "}
              Login
            </span>{" "}
          </p>
        )}
        <img
          src={assets.cross_icon}
          onClick={() => setShowLogin(false)} //to close the login form
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Login;
