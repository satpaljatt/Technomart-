import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext()

 export const CartProvider = ({children}) => {

   const [cartItems, setCartItems] = useState(
     () => {
       
       const savedCart = localStorage.getItem("cart");
   
       if (savedCart) {
         return JSON.parse(savedCart);
       }
       else {
         return [];
       }
     }
  )

     
     
     
     
           
     const addToCart = (product) => {
         
        setCartItems([...cartItems, { ...product, quantity: 1 }])

         console.log("Button click hua! Ye item jhole mein jayega:", product);
     }

    const  increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) => {
        if (item._id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
   };
   
   const decreaseQuantity = (id) => {
     setCartItems(
       cartItems.map((item) => {
         
         if (item._id === id && item.quantity > 1) {
           return { ...item, quantity: item.quantity - 1 };
         }
         return item;
       })
     );
   };

   const removeFromCart = (id) => {
     
     setCartItems(
       cartItems.filter(
         (item) =>
           item._id !== id
       )
     );
   };


   useEffect(() => {

     localStorage.setItem("cart", JSON.stringify(cartItems))

   },[cartItems]);

     return (
         
         <CartContext.Provider value={{ cartItems, addToCart, increaseQuantity, decreaseQuantity,removeFromCart }}>
             {children}
         </CartContext.Provider>
         
     )
 }

