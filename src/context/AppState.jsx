import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppState(props) {
  const url = `${import.meta.env.VITE_API_URL}`;
  // const url = "http://localhost:1000/api";
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState("");
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [userOrder, setUserOrder] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      // console.log(api.data.products);
      setProducts(api?.data?.products);
      setFilteredData(api?.data?.products);
      userProfile();
    };
    fetchProduct();
    userCart();
    getAddress();
    user_Order();
    // console.log("running this use Effect!!");
  }, [token, reload]);

  useEffect(() => {
    let lstoken = localStorage.getItem("token");
    // console.log("lstoken:: ", lstoken);
    if (lstoken && lstoken != "undefined") {
      setToken(lstoken);
      setIsAuthenticated(true);
      // console.log("You are authenticated");
    } else {
      // console.log("You are not authenticated");
    }
  }, [token]);
  //register user
  const register = async (name, email, username, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, username, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    // alert(api?.data?.message)
    toast.success(api?.data?.message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    return api?.data;
    // console.log("user registered: ",api);
  };
  //login user
  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    // alert(api?.data?.message)
    toast.success(api?.data?.message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    // console.log("user login: ", api?.data);
    setToken(api?.data?.token);
    setIsAuthenticated(api?.suceess);
    localStorage.setItem("token", api?.data?.token);
    return api.data;
  };
  //logout user
  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    localStorage.removeItem("token");

    toast.success("Logout successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  //userProfile
  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log("profile from appstate: ", api?.data?.user);
    setUser(api?.data?.user);
  };

  //add to cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgSrc },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    // console.log("my cart", api);
    toast.success(api?.data?.message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  //get User cart
  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setCart(api?.data?.cart);
  };
  //decrease quantity
  const decreaseQuantity = async (productId, qty) => {
    const api = await axios.post(
      `${url}/cart/--qty`,
      { productId, qty },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);

    toast.success(api?.data?.message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  // remove from cart
  const removeFromCart = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    // console.log("remove item from cart", api);

    toast.success(api?.data?.message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  //clear cart
  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    console.log("cart cleared", api);

    toast.success(api?.data?.message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  //shipping address
  const shippingAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      { fullName, address, city, state, country, pincode, phoneNumber },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    console.log("cart cleared", api);

    toast.success(api?.data?.message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    return api.data;
  };
  //get User latest address
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log("user Address", api.data.useraddress);
    setUserAddress(api.data.useraddress);
  };

  //user order
  const user_Order = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log("user Order :: ", api?.data);
    await setUserOrder(api?.data);
    // console.log("user Order :: ", userOrder);
  };
  const validateForm = (infoFields) => {
    // Check if any field is empty
    for (let i = 0; i < infoFields.length; i++) {
      if (infoFields[i].value === "") {
        // alert("All fields are required");
        toast.warning("All fields are required", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return false; // Prevent form submission
      }
    }

    // If all fields are filled, return true to allow submission
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        url,
        isAuthenticated,
        setIsAuthenticated,
        token,
        filteredData,
        setFilteredData,
        logout,
        user,
        addToCart,
        cart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        shippingAddress,
        userAddress,
        userOrder,
        validateForm,
      }}
    >
      {props.children}{" "}
    </AppContext.Provider>
  );
}

export default AppState;
