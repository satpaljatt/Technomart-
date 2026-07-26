import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);

  let gullak = 0;
  
  cartItems.forEach((item) => {
    gullak = gullak + (item.price * item.quantity);
  });

  const total = gullak + 50;

  const handleCheckout = () => {
     navigate('/shipping'); 
  }; 

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8 font-sans">
      
      {/* Page Title */}
      <h1 className="text-4xl font-black text-center text-[#5d4037] mb-12 tracking-tight drop-shadow-sm">
        My Cart 🛒
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT SIDE: Tera Jhola */}
        <div className="lg:col-span-2">
          {cartItems.length === 0 ? (
            <p className="text-center text-xl text-gray-500 mt-10 font-medium bg-white border border-dashed border-gray-200 rounded-2xl py-12">
              Tera jhola abhi khali hai bhai! Kuch toh daal le. 📦
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {cartItems.map((item) => (
                <div 
                  key={item._id} 
                  className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#ebd5b0]/70 flex flex-col transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#5d4037]/30"
                >
                  
                  {/* 1. IMAGE AREA (Pura box bhar diya hai) */}
                  <div className="w-full h-48 bg-white rounded-xl mb-4 overflow-hidden relative border border-gray-200/60 shadow-sm">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    />
                  </div>

                  {/* 2. NAME & PRICE AREA */}
                  <div className="flex-grow mb-4 flex justify-between items-start gap-3 mt-2">
                    <h2 className="text-lg font-bold text-gray-800 line-clamp-2 leading-snug hover:text-[#5d4037] transition-colors">{item.name}</h2>
                    <p className="text-emerald-600 text-2xl font-black whitespace-nowrap tracking-wide">₹{item.price}</p>
                  </div>

                  {/* 3. BUTTONS AREA */}
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200/60">
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-white rounded-xl overflow-hidden text-base border border-gray-300 shadow-sm">
                      
                      <button 
                        onClick={() => decreaseQuantity(item._id)}
                        className="px-4 py-2 bg-gray-50 text-gray-600 hover:bg-[#5d4037] hover:text-white font-bold transition-all duration-150 cursor-pointer"
                      >
                        -
                      </button>

                      <span className="px-5 font-black text-gray-800">{item.quantity}</span>

                      <button 
                        onClick={() => increaseQuantity(item._id)} 
                        className="px-4 py-2 bg-gray-50 text-gray-600 hover:bg-[#5d4037] hover:text-white font-bold transition-all duration-150 cursor-pointer"
                      >
                        +
                      </button>

                    </div>
                    
                    {/* Delete Icon Button */}
                    <button 
                      onClick={() => removeFromCart(item._id)} 
                      className="bg-white border border-gray-200 text-gray-400 hover:text-red-600 hover:bg-red-50 p-2.5 rounded-xl transition-all duration-200 shadow-sm cursor-pointer"
                      title="Remove Item"
                    >
                      🗑️
                    </button>
                  </div>

                </div>
              ))}
              
            </div>
          )}
        </div>

        {/* RIGHT SIDE: Order Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-7 rounded-2xl shadow-md border border-gray-200 h-fit sticky top-24 transform transition-all duration-300 relative overflow-hidden">
            
            <h2 className="text-2xl font-black text-gray-800 mb-6 border-b border-gray-100 pb-4 flex items-center gap-2">
              <span>🧾</span> Order Summary
            </h2>
            
            <div className="flex justify-between items-center text-gray-500 mb-4 text-base font-bold uppercase tracking-wide">
              <span>Subtotal</span>
              <span className="text-gray-800 font-black">₹{gullak}</span> 
            </div>

            <div className="flex justify-between items-center text-gray-500 mb-6 text-base font-bold uppercase tracking-wide">
              <span>Shipping 🚚</span>
              <span className="text-emerald-700 bg-green-50 px-2.5 py-1 rounded-md text-xs font-black border border-green-200/60">+ ₹50</span>
            </div>
            
            <div className="flex justify-between items-center text-gray-800 text-lg font-bold mt-6 pt-6 border-t border-gray-100">
              <span>Grand Total</span>
              <span className="text-[#5d4037] text-3xl font-black tracking-tight drop-shadow-sm">
                ₹{total}
              </span>
            </div>

            {/* Custom Theme Checkout Button */}
            <button 
              className="w-full bg-[#5d4037] hover:opacity-95 text-white font-bold text-lg py-4 rounded-xl mt-8 transition-all duration-200 active:scale-97 flex justify-center items-center gap-2 group shadow-sm cursor-pointer" 
              onClick={handleCheckout}
            >
              <span>Proceed to Checkout</span>
              <span className="group-hover:translate-x-0.5 transition-transform">➡️</span>
            </button>

            <p className="text-center text-gray-400 text-xs mt-4 flex items-center justify-center gap-1 font-semibold tracking-wide uppercase">
              🔒 100% Secure Checkout
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;