import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import { CartContext } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  // URL se search text read karne ke liye react-router hook
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.log("Data lane mein error:", error);
      }
    };
    fetchProducts();
  }, []);

  // ⚡ Live URL Dynamic Filtering
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
        
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-[#F4EAE1] rounded-2xl border border-[#ebd5b0] text-gray-500 font-bold text-xl shadow-inner">
            Bhai, is naam ka koi product nahi mila! 📦
          </div>
        ) : (
          filteredProducts.map((item) => (
            <div 
              key={item._id} 
              className="group bg-[#F4EAE1] rounded-2xl p-6 flex flex-col gap-4 border border-[#ebd5b0] hover:border-[#5d4037]/50 hover:shadow-[0_12px_30px_rgba(93,64,55,0.15)] transform transition-all duration-300 hover:-translate-y-1 relative"
            >
              <span className="absolute top-5 left-5 z-10 bg-[#5d4037] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm">
                {item.category || "Gadget"}
              </span>

              <div className="w-full h-64 bg-white rounded-xl overflow-hidden relative border border-gray-200/60 shadow-sm">
                <img 
                  src={item.image || 'https://via.placeholder.com/300'} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600 font-bold uppercase tracking-wider bg-[#FAF6F0] text-[#5d4037] px-2 py-0.5 rounded-md border border-[#ebd5b0]/60">
                    In Stock
                  </span>
                  <span className="text-sm text-amber-500 tracking-widest">
                    {'⭐'.repeat(item.rating ? Math.round(item.rating) : 5)}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-[#5d4037] transition-colors leading-snug min-h-[3.5rem]">
                  {item.name}
                </h2>
                
                <p className="text-emerald-700 text-2xl font-black mt-1 tracking-tight">
                  ₹{item.price}
                </p>
              </div>

              <button 
                onClick={() => addToCart(item)}
                className="mt-auto w-full bg-[#5d4037] hover:opacity-95 text-white font-bold py-3.5 text-base rounded-xl transition-all duration-200 active:scale-98 flex justify-center items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Add to Cart</span>
                <span className="group-hover:translate-x-0.5 transition-transform">🛒</span>
              </button>

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default Home;