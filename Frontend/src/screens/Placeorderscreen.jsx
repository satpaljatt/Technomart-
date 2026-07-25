import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { CartContext } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx'; 
import axios from 'axios';

export default function PlaceOrderScreen() {
  const { cartItems, shippingAddress, paymentMethod, clearCart } = useContext(CartContext);
  const { user } = useAuth();

  const navigate = useNavigate(); 

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 99.00 : 0.00; 
  const tax = subtotal * 0.18; 
  const total = subtotal + shipping + tax;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`, 
        },
      };

     const orderPayload = {
  
  orderItems: cartItems.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    image: item.image,
    price: item.price,
    product: item._id, 
  })),

 shippingAddress: shippingAddress,
  paymentMethod: paymentMethod,
  itemsPrice: subtotal,      
  shippingPrice: shipping,   
  taxPrice: tax,             
  totalPrice: total,         
};
      
      const { data } = await axios.post('/api/orders', orderPayload, config);
      
      clearCart();
      navigate(`/order/${data._id}`);

    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }; 

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {error && (
          <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-2xl font-bold uppercase tracking-wide">
            ⚠️ {error}
          </div>
        )}

        <div className="mb-10 pb-4 border-b-2 border-[#5d4037]/10">
          <h1 className="text-3xl font-black text-[#5d4037] tracking-tight uppercase">
            🛒 Review & Place Order
          </h1>
          <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-widest">Final Step Before Checkout</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-7 space-y-8">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_20px_50px_rgba(93,64,55,0.15)] border border-orange-100/50 hover:shadow-[0_20px_60px_rgba(93,64,55,0.25)] transition-all duration-300 transform hover:-translate-y-1">
              <h2 className="text-lg font-extrabold text-[#5d4037] mb-5 flex items-center gap-3">
                <span className="bg-[#5d4037] text-white w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md">1</span>
                Shipping Information
              </h2>
              <div className="text-gray-600 space-y-2 text-sm bg-gradient-to-r from-orange-50/60 to-orange-100/30 p-5 rounded-2xl border border-orange-100/80 shadow-inner">
                <p className="font-black text-gray-800 text-base">{shippingAddress?.address || "No address added"}</p>
                <p className="font-medium">{shippingAddress?.city}{shippingAddress?.pincode ? ` - ${shippingAddress.pincode}` : ""}</p>
                <p className="text-xs font-bold text-[#5d4037]/70 uppercase tracking-wider">{shippingAddress?.country || "India"}</p>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_20px_50px_rgba(93,64,55,0.15)] border border-orange-100/50 hover:shadow-[0_20px_60px_rgba(93,64,55,0.25)] transition-all duration-300 transform hover:-translate-y-1">
              <h2 className="text-lg font-extrabold text-[#5d4037] mb-5 flex items-center gap-3">
                <span className="bg-[#5d4037] text-white w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md">2</span>
                Payment Method
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600 bg-gradient-to-r from-orange-50/60 to-orange-100/30 p-5 rounded-2xl border border-orange-100/80 shadow-inner">
                <div className="bg-[#5d4037] text-white font-black px-4 py-2 rounded-xl text-xs tracking-widest uppercase shadow-md">
                  {paymentMethod === 'card' ? '💳 CARD' : '🅿️ PAYPAL'}
                </div>
                <div>
                  <p className="font-extrabold text-gray-800">
                    {paymentMethod === 'card' ? 'Secured Credit/Debit Card Gateway' : 'Paypal Wallet Integration'}
                  </p>
                  <p className="text-xs font-medium text-gray-400 mt-0.5">Fully encrypted via 256-bit SSL</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_20px_50px_rgba(93,64,55,0.15)] border border-orange-100/50">
              <h2 className="text-lg font-extrabold text-[#5d4037] mb-5 flex items-center gap-3">
                <span className="bg-[#5d4037] text-white w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md">3</span>
                Review Items ({cartItems.length})
              </h2>
              <div className="divide-y divide-gray-100 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/80">
                {cartItems.length === 0 ? (
                  <p className="text-sm text-gray-500 py-6 text-center font-medium">Your cart is completely empty.</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item._id || item.id} className="flex py-5 first:pt-2 last:pb-2 items-center justify-between gap-4 group">
                      <div className="flex items-center space-x-4">
                        <div className="relative overflow-hidden rounded-2xl shadow-md border border-gray-200 bg-white">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-20 h-20 object-cover transform group-hover:scale-110 transition duration-300"
                          />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-gray-900 text-sm group-hover:text-[#5d4037] transition duration-200">{item.name}</h4>
                          <p className="text-xs text-gray-500 mt-1 font-semibold bg-white px-2.5 py-1 rounded-lg inline-block border border-gray-100 shadow-sm">
                            Quantity: <span className="text-[#5d4037] font-black">{item.quantity}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-[#5d4037] text-base">₹{(item.price * item.quantity).toFixed(2)}</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-400 font-medium">₹{item.price.toFixed(2)} each</p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 sticky top-8">
            <div className="bg-gradient-to-b from-[#5d4037] to-[#3e2723] p-8 rounded-[32px] text-white shadow-[0_30px_70px_rgba(62,39,35,0.4)] relative overflow-hidden border border-[#5d4037]">
              
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-300/10 rounded-full blur-xl pointer-events-none"></div>

              <h2 className="text-2xl font-black mb-6 pb-3 border-b border-white/10 uppercase tracking-wide text-orange-100">
                Order Summary
              </h2>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center text-orange-100/80 font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-white text-base">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-orange-100/80 font-medium">
                  <span>Shipping & Delivery</span>
                  <span className="font-bold text-white text-base">₹{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-orange-100/80 font-medium">
                  <span>Estimated GST (18%)</span>
                  <span className="font-bold text-white text-base">₹{tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-white/10 pt-5 mt-6 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-orange-200 uppercase tracking-widest">Total Amount Due</span>
                  <span className="text-3xl font-black text-white drop-shadow-md">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading || cartItems.length === 0} 
                className="w-full mt-8 bg-white hover:bg-orange-50 disabled:bg-white/20 disabled:text-white/40 text-[#5d4037] font-black py-4.5 px-6 rounded-2xl shadow-xl transition-all duration-300 text-center text-sm uppercase tracking-wider transform hover:scale-[1.02] active:scale-98 focus:outline-none"
              >
                {loading ? '⏳ Processing...' : '🚀 Place Your Order'}
              </button>

              <p className="text-center text-[11px] text-orange-200/50 mt-5 leading-relaxed font-medium">
                🔒 Safe & secure payments only. By placing your order, you agree to Technomart's terms.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}