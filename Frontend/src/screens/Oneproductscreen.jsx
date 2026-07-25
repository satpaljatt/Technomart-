import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { ArrowLeft, ShoppingCart, CheckCircle, XCircle } from 'lucide-react';

const Oneproductscreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Product laane me dikkat hui:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
        <p className="text-xl font-bold">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition group cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Products</span>
        </button>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-slate-800 rounded-3xl p-6 md:p-10 border border-slate-700/50 shadow-2xl">
          
          {/* Left Column: Image Container */}
          <div className="w-full h-96 bg-slate-700/30 rounded-2xl overflow-hidden flex justify-center items-center p-6 border border-slate-700/30">
            <img 
              src={product.image || 'https://via.placeholder.com/400'} 
              alt={product.name} 
              className="max-h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Right Column: Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-500/30">
                  {product.brand || 'Brand'}
                </span>
                <span className="text-slate-400 text-sm">|</span>
                <span className="text-slate-400 text-sm font-medium">{product.category || 'Gadget'}</span>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="text-amber-400 text-lg tracking-widest mb-6">
                {'⭐'.repeat(product.rating ? Math.round(product.rating) : 5)}
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-slate-400 text-sm block mb-1 uppercase tracking-wider">Price</span>
                <span className="text-emerald-400 text-4xl font-black">₹{product.price}</span>
              </div>

              {/* Stock Status Badge */}
              <div className="flex items-center gap-2 mb-6">
                {product.countInStock > 0 ? (
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                    <CheckCircle className="h-4 w-4" /> In Stock ({product.countInStock} units available)
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-red-400 bg-red-500/10 px-3 py-1 rounded-lg border border-red-500/20">
                    <XCircle className="h-4 w-4" /> Out of Stock
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="border-t border-slate-700/50 pt-6">
                <h3 className="text-slate-300 font-bold mb-2 uppercase tracking-wide text-sm">Description:</h3>
                <p className="text-slate-400 text-base leading-relaxed">
                  {product.description || 'No description available for this product.'}
                </p>
              </div>
            </div>

            {/* Add to Cart Action */}
            <div className="mt-8 pt-6 border-t border-slate-700/50">
              <button 
                onClick={() => addToCart(product)}
                disabled={product.countInStock === 0}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 active:scale-95 flex justify-center items-center gap-3 shadow-lg hover:shadow-indigo-500/30 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 disabled:scale-100 disabled:cursor-not-allowed cursor-pointer"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>{product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Oneproductscreen;