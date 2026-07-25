import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import axios from 'axios';

const Editprofile = () => {
    const navigate = useNavigate();
    
    const { user ,login } = useAuth();
  
  const [formData, setFormData] = useState( {
    name: user?.name || '',
    password : '',
  }
  );
    
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
  
    const response = await axios.put(
      'http://localhost:5000/api/users/profile', 
      formData, 
      config
    );
    login(response.data);
localStorage.setItem('user', JSON.stringify(response.data));

    console.log('Backend se naya updated data aaya:', response.data);
    alert('Profile updated successfully!');
    navigate('/profile');

  } catch (error) {
    console.error("Asali Error Ye Hai Bhai:", error);
    const errorMessage = error.response?.data?.message || "Update nahi ho paya bhai!";
    alert(errorMessage);
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">

          <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        
        <div className="bg-[#5d4037] p-8 text-white text-center">
          <h2 className="text-3xl font-bold tracking-wide">Account Settings</h2>
          <p className="text-sm text-orange-200 mt-2">Update your personal details and password</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6">
          
          {/* Name Field */}
          <div>
            <label className="block text-sm font-bold text-[#5d4037] uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5d4037] focus:border-[#5d4037] outline-none transition-all shadow-sm"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-bold text-[#5d4037] uppercase tracking-wider mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep old password"
                className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5d4037] focus:border-[#5d4037] outline-none transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-base text-gray-500 hover:text-[#5d4037] font-semibold"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="px-6 py-3 text-base font-bold text-red-600 hover:bg-red-400 rounded-xl transition-all"
            >
              Cancel
                      </button>
                      
            <button
              type="submit"
              className="px-8 py-3 text-base font-bold text-white bg-[#5d4037] hover:bg-[#3e2723] rounded-xl shadow-md transition-all transform active:scale-95"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editprofile;