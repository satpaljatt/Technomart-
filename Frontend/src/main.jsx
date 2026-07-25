import React from 'react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';



const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    
    <BrowserRouter>
      
      <CartProvider>
        
        <AuthProvider>
          
          <App />
          
        </AuthProvider>
       
        
      </CartProvider> 
      
    </BrowserRouter>

</React.StrictMode>

);

