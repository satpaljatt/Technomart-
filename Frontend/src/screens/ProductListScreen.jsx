import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit2, Trash2, Eye, Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProductListScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products'); 
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Data fetch nahi hua:", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('if you want to delete the product?')) {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const token = userData?.token;

        if (!token) {
          alert('Bhai token nahi mila, ek baar logout karke login kar!');
          return;
        }

        console.log("Backend ko ja raha clean token ->", token);

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
      
        await axios.delete(`/api/products/${id}`, config);

        setProducts(products.filter((product) => product._id !== id));
        alert('Product delete ho gaya bhai!');
      } catch (error) {
        alert(error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message
        );
      }
    }
  };

  const handleAddProduct = () => {
    navigate('/admin/product/create');
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (id) => {
    navigate(`/admin/product/${id}/edit`);
  };

  const renderStatusBadge = (count) => {
    if (count > 10) {
      return <span className="bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-medium">In Stock</span>;
    } else if (count > 0) {
      return <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full text-xs font-medium">Low Stock</span>;
    } else {
      return <span className="bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full text-xs font-medium">Out of Stock</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg font-semibold text-gray-600">Loading inventory data...</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-gray-50 min-h-screen font-sans text-gray-900">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        
        {/* Table Header Controls */}
        <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Product Inventory</h1>
            <p className="text-sm text-gray-500">Manage catalog items, pricing, and stock levels.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
            </div>

            <button className="flex items-center gap-2 bg-[#5c3c2e] hover:opacity-90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition shadow-sm cursor-pointer" onClick={handleAddProduct}>
              <Plus className="h-4 w-4" /> Add Item
            </button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse hidden md:table">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="py-4 px-6">Product Details</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Stock</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50/70 transition">
                  <td className="py-4 px-6 font-medium text-gray-900 max-w-xs truncate">{product.name}</td>
                  <td className="py-4 px-6 text-gray-500">{product.category}</td>
                  <td className="py-4 px-6 font-semibold">₹{product.price}</td>
                  <td className="py-4 px-6 text-gray-600">{product.countInStock} units</td>
                  <td className="py-4 px-6">
                    {renderStatusBadge(product.countInStock)}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      
                      <button 
                        className="p-1.5 text-gray-500 hover:text-blue-600 rounded-md hover:bg-gray-100 transition cursor-pointer" 
                        title="View Details"
                        onClick={() => navigate(`/admin/product/${product._id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button 
                        className="p-1.5 text-gray-500 hover:text-amber-600 rounded-md hover:bg-gray-100 transition cursor-pointer" 
                        title="Edit Item"
                        onClick={() => handleEdit(product._id)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>

                      <button 
                        onClick={() => handleDelete(product._id)} 
                        className="p-1.5 text-gray-500 hover:text-red-600 rounded-md hover:bg-gray-100 transition cursor-pointer" 
                        title="Delete Item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 divide-y divide-gray-200 md:hidden">
            {filteredProducts.map((product) => (
              <div key={product._id} className="p-5 flex flex-col gap-3 bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base">{product.name}</h3>
                    <span className="text-xs text-gray-500">{product.category}</span>
                  </div>
                  {renderStatusBadge(product.countInStock)}
                </div>

                <div className="flex items-center justify-between text-sm py-1 border-t border-b border-gray-100 my-1">
                  <div>
                    <span className="text-gray-500 block text-xs uppercase">Price</span>
                    <span className="font-bold text-gray-900">₹{product.price}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500 block text-xs uppercase">Available Stock</span>
                    <span className="font-medium text-gray-700">{product.countInStock} units</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-1">
                  <button 
                    className="flex items-center gap-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md transition w-full justify-center cursor-pointer" 
                    onClick={() => navigate(`/admin/product/${product._id}`)}
                  >
                    <Eye className="h-3.5 w-3.5" /> View
                  </button>

                  <button 
                    className="flex items-center gap-1.5 text-xs font-medium bg-amber-50 text-amber-700 hover:bg-amber-100 px-3 py-2 rounded-md transition w-full justify-center cursor-pointer"
                    onClick={() => handleEdit(product._id)}
                  >
                    <Edit2 className="h-3.5 w-3.5" /> Edit
                  </button>
                  
                  <button 
                    onClick={() => handleDelete(product._id)} 
                    className="flex items-center gap-1.5 text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 px-3 py-2 rounded-md transition w-full justify-center cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No matching inventory found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}