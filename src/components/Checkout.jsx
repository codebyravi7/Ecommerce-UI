import React, { useContext, useState, useEffect } from "react";
import AppContext from "../context/AppContext";
import TableProduct from "./TableProduct";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout() {
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);
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

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        qty: qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });
      // console.log("Order Response: ", orderResponse)

      const { orderId, amount: orderAmount } = orderResponse.data;
      const options = {
        key: "rzp_test_2ReqnK4PPqh72c",
        amount: orderAmount * 100,
        currency: "INR",
        name: "E-COMMERCE",
        order_id: orderId,
        description: "Test Transaction",
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: user._id,
            userShipping: userAddress,
          };
          const api = await axios.post(
            `${url}/payment/verify-payment`,
            paymentData
          );
          console.log("verify payment info :: ", api?.data);
          if (api?.data?.success) {
            clearCart();
            navigate("/orderconfirmation");
          }
        },
        prefill: {
          name: "Gaurav Khanna",
          email: "garav.khanna@gmail.com",
          contact: "1212121212",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log("paymentError :: ", err);
    }
  };
  return (
    <div className="bg-white content-wrapper  h-full min-w-screen max-w-screen min-h-screen p-2 text-black">
      <div className="my-3">
        <h1 className="text-3xl text-center mb-2">Order Summary</h1>

        <table className="table shadow-2xl table-bordered border-secondary">
          <thead>
            <tr>
              <th
                scope="col"
                className="bg-slate-200 text-black font-medium text-center"
              >
                Product Details
              </th>
              <th
                scope="col"
                className="bg-slate-200 text-black font-medium text-center"
              >
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-slate-200 text-black font-medium">
                <TableProduct cart={cart} />
              </td>
              <td className="bg-slate-200 text-black font-medium">
                <ul>
                  <li>Name : {userAddress?.fullName}</li>
                  <li>Phone : {userAddress?.phoneNumber}</li>
                  <li>Pincode : {userAddress?.pincode}</li>
                  <li>Address : {userAddress?.address}</li>
                  <li>City : {userAddress?.city}</li>
                  <li>State : {userAddress?.state}</li>
                  <li>Country : {userAddress?.country}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center my-5">
        <button
          className="btn btn-lg btn-secondary hover-effect"
          onClick={handlePayment}
        >
          Proceed to pay
        </button>
      </div>
    </div>
  );
}

export default Checkout;
