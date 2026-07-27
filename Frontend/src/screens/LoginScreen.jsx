import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const LoginForm = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();
  
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    console.log("Login:", { email, password });

    try {

      const response = await axios.post('https://technomart-peach.vercel.app/api/users/login', { email, password });

      console.log("Backend se ye data aaya hai:", response.data);

      login(response.data);
      
      alert("Login Successful");
      
      navigate("/");

       
      
    }
   catch (error) {
      // '?' lagane se agar response nahi aayega, toh code fatega nahi
      const errorMessage = error.response?.data?.message || "Server crash ho gaya ya connection toot gaya!";
      
      console.log("Puri Error Details:", errorMessage);
      alert(errorMessage);
    }


  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#dbe3ef]">
      
      <div className="w-[500px] rounded-xl bg-white p-10 shadow-md">
        
        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-black  py-3 rounded-md mb-6">
          
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* email */}
          <input
            type="text"
            placeholder="email"
            className="w-full rounded-full bg-gray-200 px-4 py-2 outline-none"  
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-full bg-gray-200 px-4 py-2 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Forgot Password */}
          <div className="text-right text-sm text-gray-500">
            <span className="cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-full bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700"
          >
            Login
          </button>

          {/* Register */}
          <p className="text-center text-sm text-gray-500">
            Not a member?{" "}

            <Link to="/signup">
                <span className="text-blue-500 cursor-pointer hover:underline">
              Register now
            </span>
            </Link>
            

          </p>

        </form>
      </div>

    </div>
  );
};

export default LoginForm;