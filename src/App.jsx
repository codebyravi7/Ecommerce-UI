import React, { useContext } from "react";
import ShowProduct from "./components/product/ShowProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail";
import Navbar from "./components/Navbar";
import SearchProduct from "./components/product/SearchProduct";
import Register from "./components/user/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import Cart from "./components/Cart";
import Address from "./components/Address";
import Checkout from "./components/Checkout";
import Orderconfirmation from "./components/Orderconfirmation";
import Footer from './components/Footer'
import AppContext from "./context/AppContext";
function App() {
  const {isAuthenticated} = useContext(AppContext)
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/search" element={<SearchProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Address />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderconfirmation" element={<Orderconfirmation />} />
      </Routes>
      
    </Router>
  );
}

export default App;



const HomePage = ()=> {
  return (
    <div>
      <ShowProduct />
      <Footer />
    </div>
  )
}