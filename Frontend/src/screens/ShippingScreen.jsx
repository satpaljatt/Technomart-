import React from 'react';
import { useState } from 'react';
import  { useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext'; 
import { useNavigate } from 'react-router-dom';

const ShippingScreen = () => {

 const { saveShippingAddress } = useContext(CartContext); 
  const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
    address: '',
    city: '',
    pincode: '',
    country:''
    });
  

  const handlechange = (e) => {
      
        setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  
  const handleSubmit = (e) => {

  e.preventDefault(); 
  console.log("Form ka data ye hai bhai:", formData); 
    saveShippingAddress(formData);
    
    navigate('/payment');
};

  return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
          
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        
        {/* Header Section */}
    <div className="bg-[#5d4037] p-8 text-white text-center">
                  <h2 className="text-3xl font-bold tracking-wide">Shipping Address</h2>
                  <p className="text-sm text-orange-200 mt-2">Order kahan deliver karna hai, wo pata batao bhai</p>        
        </div>
        
        {/* Form Element */}

        <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6">
  
          {/* 1. Address Input */}
          <div>
            <label className="block text-sm font-bold text-[#5d4037] uppercase tracking-wider mb-2">
              Address
                      </label>
                      
            <input
              type="text"
              placeholder="Enter your address"
              name="address"
              value={formData.address}  
              onChange = {handlechange}            
              className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5d4037] focus:border-[#5d4037] outline-none transition-all shadow-sm"
              required
            />
          </div>

          {/* 2. City Input */}
          <div>
            <label className="block text-sm font-bold text-[#5d4037] uppercase tracking-wider mb-2">
              City
           </label>
                      
            <input
              type="text"
              placeholder="Enter city"
              name="city"
             value={formData.city}
             onChange = {handlechange} 
              className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5d4037] focus:border-[#5d4037] outline-none transition-all shadow-sm"
              required
            />
          </div>

          {/* 3. Postal Code Input */}
          <div>
            <label className="block text-sm font-bold text-[#5d4037] uppercase tracking-wider mb-2">
              Pin Code
            </label>
            <input
            type="text"
            placeholder="Enter Pin code"
            name="pincode"
            value={formData.pincode}
            onChange = {handlechange} 
              className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5d4037] focus:border-[#5d4037] outline-none transition-all shadow-sm"
              required
            />
          </div>

          {/* 4. Country Input */}
          <div>
            <label className="block text-sm font-bold text-[#5d4037] uppercase tracking-wider mb-2">
              Country
            </label>
            <input
              type="text"
              placeholder="Enter country"
              name="country"
             value = {formData.country}
              onChange = {handlechange} 
                          className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5d4037] focus:border-[#5d4037] outline-none transition-all shadow-sm"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-8 py-3 text-base font-bold text-white bg-[#5d4037] hover:bg-[#3e2723] rounded-xl shadow-md transition-all transform active:scale-95"
            >
              Proceed To Payment
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;

// import React, { createContext, useState, useEffect } from 'react';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   // 1. Initialize address from localStorage, defaulting to empty fields if none exist
//   const [shippingAddress, setShippingAddress] = useState(() => {
//     const savedAddress = localStorage.getItem('shippingAddress');
//     return savedAddress ? JSON.parse(savedAddress) : {
//       fullName: '',
//       address: '',
//       city: '',
//       postalCode: '',
//       country: ''
//     };
//   });
  
//   // You would also have your cartItems state here
//   const [cartItems, setCartItems] = useState([]);

//   // 2. Sync state with localStorage whenever it changes

//   useEffect(() => {
//     localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
//   }, [shippingAddress]);

//   // 3. Function to update the shipping address
//   const saveShippingAddress = (newAddress) => {
//     setShippingAddress(newAddress);
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, shippingAddress, saveShippingAddress }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
