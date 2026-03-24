import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import React from 'react';
import { CartContext } from '../context/CartContext';

const Home = () => {
  // ==========================================
  // 🧠 MERA BACKEND LOGIC
  // ==========================================
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        console.log("Backend se ye data aaya hai:", response.data);
      } catch (error) {
        console.log("Data lane mein error:", error);
      }
    };
    fetchProducts();
  }, []);
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-12 drop-shadow-lg tracking-wide">
        TechnoMart 🚀
      </h1>

      {/* 🔥 GRID UPDATED: Sirf 3 items per row (lg:grid-cols-3) aur zyada gap (gap-10) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        
        {products.map((item) => (
          <div 
            key={item._id} 
            className="group bg-slate-800 rounded-2xl p-6 flex flex-col gap-4 border border-slate-700/50 hover:border-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] transform transition-all duration-300 hover:-translate-y-2 relative"
          >
            {/* Category Badge */}
            <span className="absolute top-5 left-5 z-10 bg-indigo-500/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm shadow-md border border-indigo-400/50">
              {item.category || "Gadget"}
            </span>

            {/* 🔥 IMAGE AREA UPDATED: Height badha di (h-64) taaki photo badi dikhe */}
            <div className="w-full h-64 bg-slate-700/30 rounded-xl overflow-hidden flex justify-center items-center p-5 relative group-hover:bg-slate-700/50 transition-colors">
              <img 
                src={item.image || 'https://via.placeholder.com/300'} 
                alt={item.name} 
                className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl" 
              />
            </div>

            {/* DETAILS AREA */}
            <div className="flex flex-col gap-2 mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-slate-400 font-medium">In Stock</span>
                {/* 🔥 DYNAMIC RATING LOGIC */}
                <span className="text-sm text-amber-400 tracking-widest">
                  {'⭐'.repeat(item.rating ? Math.round(item.rating) : 5)}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-white line-clamp-2 group-hover:text-indigo-400 transition-colors leading-snug">
                {item.name}
              </h2>
              
              <p className="text-emerald-400 text-3xl font-black mt-2 tracking-tight">
                ₹{item.price}
              </p>
            </div>

            {/* ADD TO CART BUTTON */}
            <button 
              onClick={() => addToCart(item)}
              className="mt-auto w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 active:scale-95 flex justify-center items-center gap-2 shadow-lg hover:shadow-indigo-500/40"
            >
              <span>Add to Cart</span>
              <span className="group-hover:translate-x-1 transition-transform">🛒</span>
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Home;