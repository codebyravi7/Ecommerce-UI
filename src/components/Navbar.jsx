import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import logo from "../logo.png";
import Navbarmic from "./Navbarmic";
("./Navbarmic");

function Navbar() {
  const [searchTerm, setSearchTerm] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const { setFilteredData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);
  const filterByCategory = (cat) => {
    console.log(cat, " clicked!!");
    setFilteredData(
      products?.filter(
        (product) =>
          product?.category?.toLowerCase() === cat?.toLowerCase() ||
          cat?.toLowerCase() == "nofilter"
      )
    );
  };
  const filterByPrice = (price) => {
    console.log(price, " clicked!!");
    setFilteredData(products?.filter((product) => product?.price >= price));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setSearchTerm([]);
    navigate(`/product/search`, {
      state: { data: searchTerm },
    });
  };
  return (
    // nav z-10 bg-white-600 bg-opacity-50 backdrop-blur-sm fixed w-full top-0 left-0 flex justify-between px-12 py-3 scroll-none
    <div className="bg-white text-gray-800 fixed w-full top-0 left-0 min-w-screen max-w-screen z-10 h-[70px] shadow-md">
      <div className="navbar px-1">
        <div className="left">
          <Link to={"/"}>
            <img className="w-40" src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="form">
          <form
            className="search_bar flex border-2 outline-none rounded-xl p-1"
            onSubmit={submitHandler}
          >
            <span className="material-symbols-outlined font-semibold text-3xl">
              search
            </span>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none px-2 text-gray-500 bg-light  w-72"
              type="text"
              placeholder="Search Products..."
            />
            <Navbarmic  />
          </form>
        </div>
        <div className="right w-1/3 max-w-64">
          {isAuthenticated && (
            <div className=" flex justify-around">
              <div className="cart">
                <Link to={"/cart"} type="button" className="mx-2">
                  <span className="material-symbols-outlined font-semibold text-3xl">
                    shopping_cart
                  </span>
                  <span className="position-absolute top-2 translate-middle badge rounded-pill bg-danger">
                    {cart?.items?.length > 0 ? cart?.items?.length : ""}
                  </span>
                </Link>
              </div>
              <div className="profile">
                <Link to={"/profile"}>
                  <button className="mx-2">
                    <span className="material-symbols-outlined font-semibold text-3xl">
                      person
                    </span>
                  </button>
                </Link>
              </div>
              <div className="logout">
                <button
                  className="mx-2"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  <span className="material-symbols-outlined font-semibold text-3xl">
                    logout
                  </span>
                </button>
              </div>
            </div>
          )}
          {!isAuthenticated && (
            <div className=" flex justify-end mx-4 ">
              <Link to={"/login"}>
                <button className=" btn-secondary mx-10">
                  <span className="material-symbols-outlined text-3xl hover-effect1">
                    login
                  </span>
                </button>
              </Link>
              <Link to={"/register"}>
                <button className=" mx-1">
                  <span className="material-symbols-outlined text-3xl hover-effect1">
                    how_to_reg
                  </span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
  
    </div>
  );
}

export default Navbar;
