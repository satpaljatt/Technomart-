import React, { createContext, useState, useContext } from 'react';

// ==========================================
// GLOBAL CONTEXT BANAYA
// ==========================================

export const AuthContext = createContext();


// ==========================================
// PROVIDER COMPONENT
// ==========================================

export const AuthProvider = ({ children }) => {

  
  const [user, setUser] = useState(() => {

    const savedUser = localStorage.getItem('user');

      return savedUser ? JSON.parse(savedUser) : null;
      
  });



  // ==========================================
  // LOGIN FUNCTION
  // ==========================================

  const login = (userData) => {

    setUser(userData);

    localStorage.setItem(
      'user',
      JSON.stringify(userData)
    );
  };



  // ==========================================
  // LOGOUT FUNCTION
  // ==========================================

  const logout = () => {

    setUser(null);

    localStorage.removeItem('user');
  };



  // ==========================================
  // CONTEXT PROVIDER
  // ==========================================

  return (

    // Yaha hum data globally share kar rahe hain

    <AuthContext.Provider

      value={{

        // current user
        user,

        // login function
        login,

        // logout function
        logout

      }}
    >

      {/* 
        children ka matlab:
        Jo bhi components AuthProvider ke andar honge
      */}

      {children}

    </AuthContext.Provider>
  );
};



export const useAuth = () => useContext(AuthContext);