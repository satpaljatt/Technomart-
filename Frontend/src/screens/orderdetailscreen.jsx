import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx'; 

const OrderDetail = () => {

  const { user } = useAuth();

  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!user?.token) return;

      try {
        setLoading(true);
        
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };
        const response = await axios.get(`/api/orders/${id}`, config);

        setOrder(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, user]);

  if (loading) return <div>Loading order details...</div>;
  if (error) return <div className="error-alert">{error}</div>;
  if (!order) return <div>Order not found.</div>;

  const payOrderHandler = async () => {
  try {
    setLoading(true); 
    
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const dummyPaymentResult = {
      id: 'PAY_DUMMY_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: 'COMPLETED',
      update_time: new Date().toISOString(),
      email_address: user?.email || 'customer@example.com',
    };

    await axios.put(`/api/orders/${id}/pay`, dummyPaymentResult, config);
    
    window.location.reload(); 
    
  } catch (err) {
    setError(err.response?.data?.message || 'Payment failed');
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
      
        {/* Header */}
        <div className="mb-10 pb-4 border-b-2 border-[#5d4037]/10">
          <h1 className="text-2xl font-black text-[#5d4037] tracking-tight uppercase">
            📄 Order Details
          </h1>
          <p className="text-xs font-bold text-gray-400 mt-1 tracking-wider">ID: {order._id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
          {/* Left Side: Info & Items */}
          <div className="lg:col-span-7 space-y-8">
          
            {/* Shipping Card */}
            <div className="bg-white p-6 rounded-3xl shadow-[0_20px_50px_rgba(93,64,55,0.15)] border border-orange-100/50">
              <h2 className="text-base font-extrabold text-[#5d4037] mb-4 uppercase tracking-wide">📍 Shipping Information</h2>
              <div className="text-gray-600 text-sm bg-orange-50/50 p-4 rounded-2xl border border-orange-100/60">
                <p className="font-black text-gray-800 mb-1">{order.shippingAddress.address}</p>
                <p className="font-semibold">{order.shippingAddress.city} - {order.shippingAddress.pincode}</p>
              </div>
            </div>

            {/* Items Card */}
            <div className="bg-white p-6 rounded-3xl shadow-[0_20px_50px_rgba(93,64,55,0.15)] border border-orange-100/50">
              <h2 className="text-base font-extrabold text-[#5d4037] mb-4 uppercase tracking-wide">📦 Order Items ({order.orderItems.length})</h2>
              <div className="divide-y divide-gray-100 bg-gray-50/50 p-3 rounded-2xl">
                {order.orderItems.map((item) => (
                  <div key={item.product} className="flex py-4 items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl border" />
                      <div>
                        <h4 className="font-extrabold text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500 font-semibold mt-1">Qty: <span className="text-[#5d4037] font-black">{item.quantity}</span></p>
                      </div>
                    </div>
                    <p className="font-black text-[#5d4037] text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-5 sticky top-8">
            <div className="bg-gradient-to-b from-[#5d4037] to-[#3e2723] p-6 rounded-[32px] text-white shadow-[0_30px_70px_rgba(62,39,35,0.4)]">
              <h2 className="text-lg font-black mb-5 pb-3 border-b border-white/10 uppercase text-orange-100">Order Summary</h2>
            
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-orange-100/80">
                  <span>Items Price</span>
                  <span className="font-bold text-white">₹{order.itemsPrice?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-orange-100/80">
                  <span>Shipping</span>
                  <span className="font-bold text-white">₹{order.shippingPrice?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-orange-100/80">
                  <span>Tax (GST)</span>
                  <span className="font-bold text-white">₹{order.taxPrice?.toFixed(2)}</span>
                </div>
              
                <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-baseline">
                  <span className="text-xs font-bold text-orange-200 uppercase tracking-widest">Total Paid</span>
                  <span className="text-2xl font-black text-white">₹{order.totalPrice?.toFixed(2)}</span>
                </div>
              </div>

             
{!order.isPaid && (
  <button 
    onClick={payOrderHandler}
    className="mb-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-black uppercase tracking-wider transition-all shadow-md"
  >
    💳 Pay Now (Dummy)
  </button>
)}

              {/* Status Alert */}
              <div className={`mt-6 p-3 rounded-xl text-center text-xs font-black uppercase tracking-wider ${order.isPaid ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                Status: {order.isPaid ? '✅ Paid' : '❌ Not Paid'}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default OrderDetail;


