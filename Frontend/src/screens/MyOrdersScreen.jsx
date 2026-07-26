import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye } from 'lucide-react';

export default function MyOrdersScreen() {
    
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        setLoading(true);
        const userData = JSON.parse(localStorage.getItem('user'));
        const token = userData?.token;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get('/api/orders/myorders', config);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error('Orders fetch nahi ho paye bhai:', err);
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/profile')} 
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition cursor-pointer font-medium text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Profile</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-white">
            <h1 className="text-2xl font-black tracking-tight text-gray-800">My Orders</h1>
            <p className="text-sm text-gray-500 mt-1">Check the status of your orders and view details.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-500">
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Total</th>
                  <th className="py-4 px-6">Paid Status</th>
                  <th className="py-4 px-6">Delivery Status</th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition">
                    <td className="py-4 px-6 font-medium text-gray-900 truncate max-w-[120px]">{order._id}</td>
                    <td className="py-4 px-6 text-gray-500">{order.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}</td>
                    <td className="py-4 px-6 font-bold text-gray-800">₹{order.totalPrice}</td>
                    <td className="py-4 px-6">
                      {order.isPaid ? (
                        <span className="bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-bold">Paid</span>
                      ) : (
                        <span className="bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full text-xs font-bold">Unpaid</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {order.isDelivered ? (
                        <span className="bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-bold">Delivered</span>
                      ) : (
                        <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full text-xs font-bold">Processing</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button 
                        onClick={() => navigate(`/order/${order._id}`)} 
                        className="p-1.5 text-gray-500 hover:text-blue-600 rounded-md hover:bg-gray-100 transition cursor-pointer inline-flex items-center gap-1 text-xs font-semibold"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {orders.length === 0 && (
              <div className="text-center py-16 text-gray-500 font-medium">
                Bhai tune abhi tak koi order nahi kiya hai! 🛒
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}