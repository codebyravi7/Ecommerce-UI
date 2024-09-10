import React, { useContext, useState, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
// https://drive.google.com/file/d/1V8ei3gTva_iXjeCXQ4uK6Vm9tRc1o9Dg/view?usp=drive_link

function Cart() {
  const { cart, decreaseQuantity, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    /*the below code is different from tutor at 6:52 */
    if (cart?.items) {
      cart?.items?.forEach((item) => {
        qty += item?.qty;
        price += item?.price;
      });
      setPrice(price);
      setQty(qty);
    }
  }, [cart]);
  return (
    <div className="bg-white- content-wrapper  h-full min-w-screen max-w-screen min-h-screen p-2 text-black">
      {qty > 0 ? (
        <>
          <div className="my-5 text-center">
            <span className=" bg-gray-300 p-2 px-3 mx-1">
              Total Qty : {qty}{" "}
            </span>
            <span className="bg-gray-300 p-2 px-3 mx-1">
              Total Price : {price}{" "}
            </span>
          </div>
          <div className="">
            {cart?.items?.map((product) => (
              <div
                key={product?._id}
                className="relative bg-white flex m-8 mx-16 p-2 items-center rounded-lg text-gray-500"
              >
                <div className="cart-img mr-4">
                  <img
                    src={product?.imgSrc}
                    alt={product?.title}
                    className="w-32  rounded-lg"
                  />
                </div>

                <div className="cart-info overflow-hidden ">
                  <p className="text-2xl font-medium text-wrap">
                    {product?.title}
                  </p>
                  <h3>{product?.price}</h3>
                  <h3>Qty: {product?.qty}</h3>
                </div>
                <div className="action absolute right-0 max-w-1/4">
                  <div className="btn bg-gray-200 hover-effect mx-1">
                    <span
                      className="material-symbols-outlined"
                      onClick={() => decreaseQuantity(product?.productId, 1)}
                    >
                      do_not_disturb_on
                    </span>
                  </div>
                  <div
                    className="btn bg-gray-200 hover-effect"
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
                    <span className="material-symbols-outlined">
                      add_circle
                    </span>
                  </div>
                  <div
                    className="btn bg-gray-200  hover-effect mx-1"
                    onClick={() => removeFromCart(product?.productId)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div
              className="btn bg-gray-50 hover-effect mx-3"
              onClick={() => navigate("/shipping")}
            >
              Checkout
            </div>
            <div
              className="btn bg-gray-50 hover-effect mx-3"
              onClick={clearCart}
            >
              Clear Cart
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className="flex flex-col justify-center items-center ">
            <img
              src="https://img.freepik.com/free-vector/woman-pushing-shopping-cart-white-background_1308-43517.jpg?t=st=1724010114~exp=1724013714~hmac=3301bcee70eb80c133c40026275ef091651b2db346b56e89c181ddaea91105fa&w=740"
              alt=""
              className="w-96 bg-contain"
            />
            <h1 className="text-3xl ">Your Cart is Empty!!</h1>
            <button
              className="text-2xl m-4 p-2  bg-slate-300 hover-effect"
              onClick={() => navigate("/")}
            >
              Shop Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
