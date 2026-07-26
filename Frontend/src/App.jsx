import React from 'react'    
import Home from './pages/Home'
import { Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingScreen from './screens/ShippingScreen';
import ProfileScreen from './screens/ProfileScreen'
import Editprofile from './screens/Editprofile'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/Placeorderscreen'
import Orderdetail from './screens/orderdetailscreen'
import UserListScreen from './screens/UserListScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductCreateScreen from './screens/ProductCreateScreen'
import Editproduct from './screens/Editproduct'
import Oneproductscreen from './screens/Oneproductscreen'
import OrderList from './screens/OrderList'
import MyOrdersScreen from './screens/MyOrdersScreen'
import SavedAddressesScreen from './screens/SavedAddressesScreen'


const App = () => {
 
  return (
    <>
      <Navbar />
      <Routes>
       
        <Route path="/" element={<Home />} />

        <Route path="/Cart" element={<Cart />} />
        
        <Route path="/signup" element={<RegisterScreen />} />

        <Route path="/login" element={<LoginScreen />} /> 

      <Route path="/profile" element={<ProfileScreen />} />

     <Route path="/editprofile" element={<Editprofile />} />

        <Route path="/shipping" element={<ShippingScreen />} />

        <Route path="/placeorder" element={<PlaceOrderScreen />} />

        <Route path="/order/:id" element={<Orderdetail />} />

        <Route path="/admin/product/create" element={<ProductCreateScreen />} />

        <Route path= "/payment" element ={<PaymentScreen />} />

        <Route path="/admin/userlist" element={<UserListScreen />} />
        
        <Route path="/admin/productlist" element={<ProductListScreen />} />

       <Route path="/admin/product/create" element={<ProductCreateScreen />} />
        
        <Route path="/admin/product/:id/edit" element={<Editproduct />} />

        <Route path="/admin/product/:id" element={<Oneproductscreen />} />

        <Route path="/admin/orderlist" element={<OrderList />} />

        <Route path="/myorders" element={<MyOrdersScreen />} />
        
        <Route path="/savedaddresses" element={<SavedAddressesScreen />} />
        
      </Routes>

      </>
  )
}

export default App

