import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
const { cartItems, increaseQuantity, decreaseQuantity ,removeFromCart} = useContext(CartContext);
  // ==========================================
  // 🧠 TERA LOGIC (Ekdum Safe)
  // ==========================================
 let gullak = 0;

  cartItems.forEach((item) => {
    // Price ko quantity se multiply karke gullak mein daalo
    gullak = gullak + (item.price * item.quantity);
  });

  const total = gullak + 50;
  // ==========================================
  // qantity ko update karna hai


 


  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-10 drop-shadow-lg">
        My Cart 🛒
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT SIDE: Tera Jhola */}
        <div className="lg:col-span-2">
          {cartItems.length === 0 ? (
            <p className="text-center text-xl text-gray-400 mt-10">Tera jhola abhi khali hai bhai! Kuch toh daal le.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {cartItems.map((item) => (
                <div key={item._id} className="bg-slate-800 p-5 rounded-xl shadow-lg border border-slate-700 flex flex-col transform transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/20 hover:border-cyan-500/50">
                  
                  {/* 1. IMAGE AREA */}
                  <div className="w-full h-48 bg-white/90 rounded-lg mb-4 flex justify-center items-center overflow-hidden p-3 shadow-inner">
                    <img src={item.image} alt={item.name} className="max-h-full object-contain hover:scale-110 transition-transform duration-500" />
                  </div>

                  {/* 2. NAME & PRICE AREA */}
                  <div className="flex-grow mb-4 flex justify-between items-start gap-3 mt-2">
                    <h2 className="text-lg font-bold text-blue-300 line-clamp-2 leading-snug">{item.name}</h2>
                    <p className="text-emerald-400 text-2xl font-extrabold whitespace-nowrap tracking-wide">₹{item.price}</p>
                  </div>

                  {/* 3. BUTTONS AREA */}
                  <div className="flex justify-between items-center mt-auto pt-5 border-t border-slate-700/50">
                    
                    <div className="flex items-center bg-slate-900 rounded-lg overflow-hidden text-lg border border-slate-600 shadow-inner">
                      
                      <button onClick={() => decreaseQuantity(item._id)}className="px-4 py-1.5 bg-slate-700 text-gray-300 hover:bg-rose-500 hover:text-white font-bold transition-all duration-200">
                        -
                      </button>

                      <span className="px-5 font-black text-cyan-50">{item.quantity}</span>

                      <button onClick={()=>increaseQuantity(item._id)} className="px-4 py-1.5 bg-slate-700 text-gray-300 hover:bg-emerald-500 hover:text-white font-bold transition-all duration-200">
                        +
                      </button>

                    </div>
                    
                    <button onClick={() => removeFromCart(item._id)} className="bg-slate-700 hover:bg-red-500 text-white p-2.5 rounded-lg transition-all duration-300 hover:scale-110 shadow-md">
                      🗑️
                    </button>
                  </div>

                </div>
              ))}
              
            </div>
          )}
        </div>

        {/* RIGHT SIDE: 🔥 NAYA VIP Order Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/80 backdrop-blur-md p-7 rounded-2xl shadow-2xl border border-slate-600/50 h-fit sticky top-24 transform transition-all duration-300 hover:shadow-blue-500/20 hover:border-blue-500/30 relative overflow-hidden">
            
            {/* Piche ka neela Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <h2 className="text-2xl font-black text-white mb-6 border-b border-slate-600/50 pb-4 flex items-center gap-2">
              <span>🧾</span> Order Summary
            </h2>
            
            <div className="flex justify-between items-center text-gray-400 mb-4 text-lg font-medium hover:text-gray-200 transition-colors">
              <span>Subtotal</span>
              <span className="text-gray-100">₹{gullak}</span> 
            </div>

            <div className="flex justify-between items-center text-gray-400 mb-6 text-lg font-medium hover:text-gray-200 transition-colors">
              <span>Shipping 🚚</span>
              <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded text-sm font-bold">+ ₹50</span>
            </div>
            
            <div className="flex justify-between items-center text-white text-xl font-black mt-6 pt-6 border-t border-slate-600/50">
              <span>Grand Total</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-3xl drop-shadow-md">
                ₹{total}
              </span>
            </div>

            <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-lg py-4 rounded-xl mt-8 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 active:scale-95 flex justify-center items-center gap-2 group">
              <span>Proceed to Checkout</span>
              <span className="group-hover:translate-x-1 transition-transform">➡️</span>
            </button>

            <p className="text-center text-slate-400 text-xs mt-4 flex items-center justify-center gap-1 font-medium">
              🔒 100% Secure Checkout
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;