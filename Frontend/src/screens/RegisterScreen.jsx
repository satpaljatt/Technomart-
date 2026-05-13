import React, { useState } from "react";
import axios from "axios";


const RegisterScreen = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };





  const handleSubmit = async (e) => {
    e.preventDefault();


    if (formData.password !== formData.confirmPassword) {
      alert("Bhai, dono passwords match nahi ho rahe!");
      return;
    }

    console.log("Register Button Dab Gaya! Data:", formData);





    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);

      console.log("Backend se ye data aaya hai:", response.data);

    } catch (error) {
      console.log("Data lane mein error:", error.response.data.message);

       const errormessage = error.response.data.message
      alert(errormessage);
    }
    
    
  };




  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e2e8f0] p-4">
      
      <div className="w-[450px] rounded-2xl bg-white p-10 shadow-lg">
        
        <h2 className="mb-8 text-center text-3xl font-bold text-[#1e293b]">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
         
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full rounded-full bg-gray-200 px-5 py-3 outline-none text-sm text-gray-700"
            value={formData.name}
            onChange={handleChange}
            required
          />

        
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded-full bg-gray-200 px-5 py-3 outline-none text-sm text-gray-700"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full rounded-full bg-gray-200 px-5 py-3 outline-none text-sm text-gray-700"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Re-Enter Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-Enter Password"
            className="w-full rounded-full bg-gray-200 px-5 py-3 outline-none text-sm text-gray-700"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {/* Checkbox (Terms & Conditions) */}
          <div className="flex items-center justify-center space-x-2 py-2">
            <input
              type="checkbox"
              name="agreed"
              id="terms"
              className="h-4 w-4 cursor-pointer"
              checked={formData.agreed}
              onChange={handleChange}
              required
            />
            <label htmlFor="terms" className="cursor-pointer text-xs text-gray-500">
              I agree to these <span className="text-gray-700 font-semibold hover:underline">Terms & Conditions</span>
            </label>
          </div>

          
          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full rounded-full bg-[#18648c] py-3 text-sm font-semibold text-white transition hover:bg-[#124d6e]"
           onSubmit={handleSubmit}
          >
            Sign Up
          </button>


          {/* Login Link */}
          <p className="mt-4 text-center text-xs text-gray-500">
            Already a member?{" "}

            <span className="cursor-pointer text-[#18648c] font-semibold hover:underline">
              Login Here
            </span>

          </p>

        </form>
        
      </div>

    </div>
  );
};

export default RegisterScreen;