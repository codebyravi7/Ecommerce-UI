import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import Navbarmic from "./Navbarmic";
import logo from '../logo.png'
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { logout, isAuthenticated, cart } =
    useContext(AppContext);
  
  console.log("isAuthenticated:: ",isAuthenticated)

  const submitHandler = (e) => {
    e.preventDefault();
    setSearchTerm("");
    navigate(`/product/search`, {
      state: { data: searchTerm },
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white text-gray-800 fixed w-full top-0 left-0 z-10 shadow-md">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img className="h-8 w-auto sm:h-10" src={logo} alt="Logo" />
            </Link>
          </div>

          {/* Desktop Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-2xl mx-4">
            <form
              className="flex items-center border-2 rounded-xl p-1"
              onSubmit={submitHandler}
            >
              <span className="material-symbols-outlined text-2xl">search</span>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full outline-none px-2 text-gray-500"
                type="text"
                placeholder="Search Products..."
              />
              <Navbarmic />
            </form>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/cart" className="relative">
                  <span className="material-symbols-outlined text-2xl">
                    shopping_cart
                  </span>
                  {cart?.items?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {cart.items.length}
                    </span>
                  )}
                </Link>
                <Link to="/profile">
                  <span className="material-symbols-outlined text-2xl">
                    person
                  </span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  <span className="material-symbols-outlined text-2xl">
                    logout
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <span className="material-symbols-outlined text-2xl hover-effect1">
                    login
                  </span>
                </Link>
                <Link to="/register">
                  <span className="material-symbols-outlined text-2xl hover-effect1">
                    how_to_reg
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <span className="material-symbols-outlined text-2xl">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          {/* Mobile Search Bar */}
          <form
            className="flex items-center border-2 rounded-xl p-1 mx-2 mb-3"
            onSubmit={submitHandler}
          >
            <span className="material-symbols-outlined text-2xl">search</span>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full outline-none px-2 text-gray-500"
              type="text"
              placeholder="Search Products..."
            />
            <Navbarmic />
          </form>

          {/* Mobile Navigation Items */}
          {isAuthenticated ? (
            <div className="space-y-2">
              <Link
                to="/cart"
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                <span>Cart ({cart?.items?.length || 0})</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                <span className="material-symbols-outlined">person</span>
                <span>Profile</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 w-full text-left"
              >
                <span className="material-symbols-outlined">logout</span>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="material-symbols-outlined">login</span>
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="material-symbols-outlined">how_to_reg</span>
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
