import axios from "axios";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const Page = () => {
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
        "http://localhost:5000/api/user/register",
        SignData
      );
      console.log("Sign-up:", response.data);
      // Save token to localStorage or context/state
      localStorage.setItem("token", response.data.token);
      setSignData({
        email: "",
        password: "",
      });
    } catch (err) {
      console.error("Error register in:", err);
    }
  };

  const Navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="container max-w-xl mx-auto p-8 ">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-5xl text-[#161346] font-bold">YouTube</h1>
          <h2 className="text-5xl text-[#161346] font-bold">Create an Account</h2>
          <p className="text-center font-medium text-lg text-[#ff7f00]">
          You MUST create an account to manage your subscription.
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
              type="password"
              name="password"
              placeholder="Password"
              value={SignData.password}
              onChange={handleChange}
              className="p-4 bg-gray-300 border rounded-lg w-full"
            />
          </div>
         <div className=" flex justify-center items-center">
         <button
            className="flex items-center justify-center gap-x-3 border-2 border-[#161346] rounded-full hover:text-[#161346] hover:bg-gray-50 bg-[#161346] py-4 px-10 text-white"
            type="submit"
          >
            Submit
            <FaArrowRightLong />
          </button>
         </div>
         <div className=" text-center">
            <h1 className="text-[#161346] font-semibold text-md">I have an account, go to <Link to='/login'><span className=" underline text-lg text-blue-700">log in.</span></Link></h1>
            <Link to='#'><h3 className="pt-4 text-orange-500 text-xl">Create your account!</h3></Link>
            <button onClick={()=>Navigate.back()} className="pt-4 text-blue-700 text-lg underline">❮❮ Back to YouTube.com</button>
         </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
