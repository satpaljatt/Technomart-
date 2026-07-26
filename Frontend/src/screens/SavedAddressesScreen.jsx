import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Trash2, Edit2, Plus, X } from 'lucide-react';

export default function SavedAddressesScreen() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  
  const [addressType, setAddressType] = useState('Home');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState(''); 
  const [country, setCountry] = useState('');

  const navigate = useNavigate();

  const getHeaders = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    return {
      headers: { Authorization: `Bearer ${userData?.token}` },
    };
  };

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/users/addresses', getHeaders());
      setAddresses(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isEditMode) {
        response = await axios.put(
          `/api/users/addresses/${editAddressId}`,
          { addressType, address, city, pincode, country },
          getHeaders()
        );
        alert('Address mast update ho gaya bhai!');
      } else {
        response = await axios.post(
          '/api/users/addresses',
          { addressType, address, city, pincode, country }, 
          getHeaders()
        );
        alert('Naya address save ho gaya bhai!');
      }
      setAddresses(response.data);
      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const startEdit = (addr) => {
    setIsEditMode(true);
    setEditAddressId(addr._id);
    setAddressType(addr.addressType);
    setAddress(addr.address);
    setCity(addr.city);
    setPincode(addr.pincode); 
    setCountry(addr.country);
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setIsEditMode(false);
    setEditAddressId(null);
    setAddressType('Home');
    setAddress('');
    setCity('');
    setPincode(''); 
    setCountry('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Kya aap is address ko sach me delete karna chahte hain?')) {
      try {
        const { data } = await axios.delete(`/api/users/addresses/${id}`, getHeaders());
        setAddresses(data);
        alert('Address udd gaya bhai!');
      } catch (err) {
        alert(err.response?.data?.message || err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Loading your addresses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        
        <button 
          onClick={() => navigate('/profile')} 
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition cursor-pointer font-medium text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Profile</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden p-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5 mb-6">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-gray-800">Saved Addresses</h1>
              <p className="text-sm text-gray-500 mt-1">Manage your multiple delivery locations.</p>
            </div>
            <button 
              onClick={() => { if(showForm) resetForm(); else setShowForm(true); }}
              className="flex items-center gap-2 bg-[#5d4037] hover:opacity-90 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-sm cursor-pointer self-start sm:self-center"
            >
              {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              <span>{showForm ? 'Cancel' : 'Add New Address'}</span>
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <h3 className="font-bold text-sm text-gray-700 mb-2">{isEditMode ? '✏️ Edit Address Details' : '➕ Add New Address Details'}</h3>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Address Type</label>
                <select 
                  value={addressType} 
                  onChange={(e) => setAddressType(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#5d4037]"
                >
                  <option value="Home">🏠 Home</option>
                  <option value="Office">🏢 Office</option>
                  <option value="Other">📍 Other</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Street Address</label>
                <input 
                  type="text" required value={address} onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat no, Building name, Area"
                  className="w-full bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#5d4037]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">City</label>
                <input 
                  type="text" required value={city} onChange={(e) => setCity(e.target.value)}
                  placeholder="City name"
                  className="w-full bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#5d4037]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Pincode</label>
                <input 
                  type="text" required value={pincode} onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 452001"
                  className="w-full bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#5d4037]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Country</label>
                <input 
                  type="text" required value={country} onChange={(e) => setCountry(e.target.value)}
                  placeholder="India"
                  className="w-full bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#5d4037]"
                />
              </div>

              <button type="submit" className="sm:col-span-2 bg-[#5d4037] text-white font-bold py-3 rounded-xl hover:opacity-95 transition cursor-pointer mt-2 text-center">
                {isEditMode ? 'Update Address' : 'Save Address'}
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div key={addr._id} className="border border-gray-200 hover:border-gray-300 bg-white rounded-xl p-5 shadow-sm relative flex flex-col justify-between group">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-[#5d4037]" />
                    <span className="font-bold text-gray-800 text-sm bg-gray-100 px-2.5 py-0.5 rounded-md">
                      {addr.addressType}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium text-sm leading-relaxed mb-1">{addr.address}</p>
                  <p className="text-gray-500 text-xs font-semibold">{addr.city}, {addr.pincode}</p>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mt-0.5">{addr.country}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end gap-2">
                  <button 
                    onClick={() => startEdit(addr)}
                    className="text-gray-400 hover:text-[#5d4037] p-1.5 rounded-lg hover:bg-amber-50 transition cursor-pointer"
                    title="Edit Address"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(addr._id)}
                    className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer"
                    title="Delete Address"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {addresses.length === 0 && !showForm && (
            <div className="text-center py-12 text-gray-500 font-medium bg-gray-50 border border-dashed border-gray-200 rounded-xl">
              Bhai koi saved address nahi mila! Naya add kar lo. 📍
            </div>
          )}

        </div>
      </div>
    </div>
  );
}