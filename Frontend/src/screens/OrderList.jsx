import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/orders'); 
      setOrders(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatusHandler = async (orderId) => {
    try {
      const selectedStatus = document.getElementById(`status-${orderId}`).value;
      
      await axios.put(`/api/orders/${orderId}/deliver`, { status: selectedStatus });
      
      alert('Order status updated successfully!');
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  if (loading) return <div className="text-center mt-10 font-bold text-lg">Loading orders...</div>;
  if (error) return <div className="text-center mt-10 text-red-500 font-bold">{error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Panel: Orders</h1>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-800 text-white text-left text-sm font-semibold uppercase tracking-wider">
              <th className="p-4">ID</th>
              <th className="p-4">USER</th>
              <th className="p-4">DATE</th>
              <th className="p-4">TOTAL</th>
              <th className="p-4">PAID</th>
              <th className="p-4">DELIVERED</th>
              <th className="p-4 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-200 text-gray-700">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-mono text-xs">{order._id}</td>
                <td className="p-4">{order.user ? order.user.name : 'Guest Customer'}</td>
                <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-4 font-medium">₹{order.totalPrice}</td>
                <td className="p-4">
                  {order.isPaid ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Paid</span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">Pending</span>
                  )}
                </td>
                <td className="p-4">
                  {order.isDelivered ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Delivered</span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">Processing</span>
                  )}
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <select 
                      id={`status-${order._id}`}
                      defaultValue={order.isDelivered ? 'Delivered' : 'Processing'}
                      className="border border-gray-300 rounded p-1 bg-white text-xs outline-none focus:border-blue-500"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    
                    <button
                      onClick={() => updateStatusHandler(order._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded shadow transition"
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;