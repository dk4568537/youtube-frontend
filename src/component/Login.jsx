import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();
  const [SignData, setSignData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignData({
      ...SignData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/Login/",
        SignData
      );
      console.log("Login Data:", response.data);

      // Set cookies after successful login
      Cookies.set("token", response.data.token, { expires: 30 });
      Cookies.set("user", response.data.user, { expires: 30 });
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setSignData({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };
  const toast = useToast();

  const handleClick = () => {
    toast({
      title: "Notification",
      description: "login in successfully!",
      status: "info",
      duration: 5000,
      isClosable: true,
      position:'top-right'
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="container max-w-xl mx-auto p-8 ">
        <div className="flex flex-col items-center space-y-4">
          <Link to="/">
            <h1 className="text-5xl font-serif text-[#161346] font-bold">
              YouTube
            </h1>
          </Link>
          <h2 className="text-5xl font-serif text-[#161345] font-bold">
            Log In
          </h2>
          <p className="text-center font-bold text-[#161345]">
            If you haven't already, you must{" "}
            <Link to="/sign-up">
              <span className="underline text-blue-600">Create an Account</span>
            </Link>{" "}
            to manage your Youtube subscription.
          </p>
        </div>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-[#161346] font-semibold">
              EMAIL
            </label>
            <input
              id="email"
              className="p-4 bg-gray-300 border rounded-lg w-full"
              type="text"
              name="email"
              placeholder="Email"
              value={SignData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="password" className="text-[#161346] font-semibold">
              PASSWORD
            </label>
            <input
              id="password"
              className="p-4 bg-gray-300 border rounded-lg w-full"
              type="password"
              name="password"
              placeholder="Password"
              value={SignData.password}
              onChange={handleChange}
            />
          </div>
          <div className=" flex justify-center items-center">
            <button
              onClick={handleClick}
              className="flex items-center justify-center gap-x-3 border-2 border-[#161346] rounded-full hover:text-[#161346] hover:bg-gray-50 bg-[#161346] py-4 px-10 text-white"
              type="submit"
            >
              Next
              <FaArrowRightLong />
            </button>
          </div>
          <div className=" text-center">
            <Link to="#">
              <h1 className=" font-semibold text-orange-500 text-lg">
                Forgot Password →
              </h1>
            </Link>
            <p className=" text-lg font-semibold pt-3 text-[#161346]">
              Haven’t been here before?
            </p>
            <Link to="/sign-up">
              <h3 className=" font-semibold text-orange-500 text-lg">
                Create your account!
              </h3>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
