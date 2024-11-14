import React, { useContext, useState, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, decreaseQuantity, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      cart?.items?.forEach((item) => {
        qty += item?.qty;
        price += item?.price * item?.qty; // Fixing price calculation to multiply by qty
      });
      setPrice(price);
      setQty(qty);
    }
  }, [cart]);

  return (
    <div className="bg-gray-50 h-full min-w-screen max-w-screen min-h-screen p-4 text-black">
      {qty > 0 ? (
        <>
          <div className="my-5 text-center text-xl font-semibold">
            <span className="bg-gray-200 p-2 px-4 mx-2 rounded-xl">
              Total Qty: {qty}{" "}
            </span>
            <span className="bg-gray-200 p-2 px-4 mx-2 rounded-xl">
              Total Price: ₹{price}{" "}
            </span>
          </div>

          <div className="space-y-8">
            {cart?.items?.map((product) => (
              <div
                key={product?._id}
                className="relative bg-white flex p-4 items-center rounded-lg shadow-md"
              >
                <div className="cart-img mr-4">
                  <img
                    src={product?.imgSrc}
                    alt={product?.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>

                <div className="cart-info flex-grow">
                  <p className="text-xl font-medium">{product?.title}</p>
                  <p className="text-gray-600">Price: ₹{product?.price}</p>
                  <p className="text-gray-600">Qty: {product?.qty}</p>
                </div>

                <div className="action absolute right-4 flex items-center space-x-3">
                  <button
                    className="btn bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                    onClick={() => decreaseQuantity(product?.productId, 1)}
                  >
                    <span className="material-symbols-outlined text-lg">
                      do_not_disturb_on
                    </span>
                  </button>

                  <button
                    className="btn bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                    onClick={() =>
                      addToCart(
                        product?.productId,
                        product?.title,
                        product?.price / product?.qty,
                        1,
                        product?.imgSrc
                      )
                    }
                  >
                    <span className="material-symbols-outlined text-lg">
                      add_circle
                    </span>
                  </button>

                  <button
                    className="btn bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                    onClick={() => removeFromCart(product?.productId)}
                  >
                    <span className="material-symbols-outlined text-lg">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <button
              className="btn bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-lg shadow-md mx-3"
              onClick={() => navigate("/shipping")}
            >
              Checkout
            </button>
            <button
              className="btn bg-red-500 text-white hover:bg-red-600 px-6 py-3 rounded-lg shadow-md mx-3"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <img
            src="https://img.freepik.com/free-vector/woman-pushing-shopping-cart-white-background_1308-43517.jpg?t=st=1724010114~exp=1724013714~hmac=3301bcee70eb80c133c40026275ef091651b2db346b56e89c181ddaea91105fa&w=740"
            alt="Empty Cart"
            className="w-96 bg-contain"
          />
          <h1 className="text-3xl text-gray-600">Your Cart is Empty!</h1>
          <button
            className="btn bg-slate-300 hover:bg-slate-400 text-xl m-4 p-2 rounded-lg"
            onClick={() => navigate("/")}
          >
            Shop Now
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
