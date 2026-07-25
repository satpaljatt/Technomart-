import React from 'react';
// Dhyan rakhna ki tera AuthContext ka path yahi ho
import { useAuth } from '../context/AuthContext'; 
import Editprofile from './Editprofile';

import { Link , useNavigate } from 'react-router-dom';

const ProfileScreen = () => {
 
  const navigate = useNavigate();

  const handleEditprofile = () => {
    navigate('/editprofile');
  }
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Top Banner (Matching your Navbar theme) */}
        <div className="bg-[#5d4037] h-32 relative"></div>

        {/* Profile Info Section */}
        <div className="px-8 py-6 relative">
          
          {/* Dynamic Avatar: User ke naam ka pehla letter dikhayega */}
          <div className="absolute -top-16 left-8 h-24 w-24 bg-[#F5E0C3] rounded-full border-4 border-white flex items-center justify-center text-[#5d4037] text-4xl font-bold shadow-md">
            
            {user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
          
          </div>

          <div className="mt-8">
            <h2 className="text-3xl font-extrabold text-gray-800">
              {user?.name || 'Guest User'}
            </h2>
            <p className="text-gray-500 font-medium mt-1">
              {user?.email || 'No email provided'}
            </p>
            <span className="mt-3 inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full uppercase font-bold tracking-wider">
              Verified Customer
            </span>
          </div>

          {/* E-commerce Action Cards */}
          <div className="mt-10 border-t border-gray-200 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Orders Section */}
            <div className="p-5 border-2 border-transparent rounded-xl hover:border-blue-200 hover:shadow-md transition-all cursor-pointer bg-blue-50 group">
              <div className="flex items-center gap-4">
                <span className="text-3xl group-hover:scale-110 transition-transform">📦</span>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">My Orders</h3>
                  <p className="text-sm text-gray-600">Track, return, or buy things again</p>
                </div>
              </div>
            </div>

            {/* Account Settings Section */}
            <div className="p-5 border-2 border-transparent rounded-xl hover:border-orange-200 hover:shadow-md transition-all cursor-pointer bg-orange-50 group" onClick={handleEditprofile}>
              <div className="flex items-center gap-4">
                <span className="text-3xl group-hover:scale-110 transition-transform">⚙️</span>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Account Settings</h3>
                  <p className="text-sm text-gray-600">Edit password, name, and mobile</p>
                </div>
              </div>
            </div>

            {/* Saved Addresses Section */}
            <div className="p-5 border-2 border-transparent rounded-xl hover:border-green-200 hover:shadow-md transition-all cursor-pointer bg-green-50 group">
              <div className="flex items-center gap-4">
                <span className="text-3xl group-hover:scale-110 transition-transform">📍</span>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Saved Addresses</h3>
                  <p className="text-sm text-gray-600">Manage shipping addresses</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;