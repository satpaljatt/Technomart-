import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx'; 

const UserListScreen = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.token) return;

      try {
          setLoading(true);
          
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        
        const response = await axios.get('/api/users', config);
        setUsers(response.data);
      }
      catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch users');
      }
      finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  if (loading) return <div className="text-center mt-10 font-bold text-[#5d4037]">Loading users...</div>;
  if (error) return <div className="text-center mt-10 font-bold text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 pb-4 border-b-2 border-[#5d4037]/10">
          <h1 className="text-2xl font-black text-[#5d4037] tracking-tight uppercase">
            👥 User Management (Admin Only)
          </h1>
          <p className="text-xs font-bold text-gray-400 mt-1 tracking-wider">Total Registers: {users.length}</p>
        </div>


        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(93,64,55,0.15)] border border-orange-100/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#5d4037] to-[#3e2723] text-white text-xs font-black uppercase tracking-wider">
                  <th className="p-4">ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-gray-50/50 text-sm font-semibold text-gray-700">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-orange-50/30 transition-colors">
                    <td className="p-4 font-mono text-xs text-gray-400">{u._id}</td>
                    <td className="p-4 font-black text-gray-900">{u.name}</td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4">
                     
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${u.isAdmin ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {u.isAdmin ? '👑 Admin' : '👤 User'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserListScreen;