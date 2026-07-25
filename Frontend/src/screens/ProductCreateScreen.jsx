import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProductCreateScreen() {

    const navigate = useNavigate();
    
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    countInStock: 0,
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData?.token;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post('/api/products', formData, config);
      
        setLoading(false);
        
      alert('Product successfully add ho gaya bhai!');
      
        navigate('/admin/productlist');
        
    }
    
    catch (error) {
      setLoading(false);
      alert(error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 border border-gray-200 font-sans text-gray-900">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Add New Product (Admin Panel)</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border p-2 rounded-lg focus:outline-blue-500" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full border p-2 rounded-lg focus:outline-blue-500" required 
                      
                      />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Available Stock</label>
                  <input type="number"
                      name="countInStock"
                      value={formData.countInStock}
                      onChange={handleChange}
                      className="w-full border p-2 rounded-lg focus:outline-blue-500" required 
                      
                      />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                  <input type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className="w-full border p-2 rounded-lg focus:outline-blue-500" required
                  />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full border p-2 rounded-lg focus:outline-blue-500" required 
                      
                      />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      className="w-full border p-2 rounded-lg focus:outline-blue-500" required />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      className="w-full border p-2 rounded-lg focus:outline-blue-500" required></textarea>
        </div>

        <div className="md:col-span-2 mt-2">
                  <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#5c3c2e] hover:opacity-90 text-white p-3 rounded-lg font-semibold transition disabled:bg-gray-400 cursor-pointer">
            {loading ? 'Saving Product...' : 'Save Product'}
          </button>
        </div>

      </form>
    </div>
  );
}