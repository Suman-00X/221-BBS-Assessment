import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import Home from './Components/Home';
import AddProduct from './Components/AddProduct';
import ProductDetails from './Components/ProductDetails';
import ModifyProduct from './Components/ModifyProduct';
import OrderPage from './Components/OrderPage'
import AllOrders from './Components/AllOrders'
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/add-product" element={<AddProduct/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/modify-product/:id" element={<ModifyProduct/>} />
        <Route path="/order/:id" element={<OrderPage/>} />
        <Route path="/my-orders" element={<AllOrders/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
