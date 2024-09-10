import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import ShowOrderProduct from "./ShowOrderProduct";
import { useNavigate, Link } from "react-router-dom";
function Orderconfirmation() {
  const navigate = useNavigate();
  const { userOrder } = useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState({});
  useEffect(() => {
    if (userOrder) {
      setLatestOrder(userOrder[0]);
    }
  }, [userOrder]);
  return (
    <div className="bg-white content-wrapper  h-full min-w-screen max-w-screen min-h-screen p-2 text-black">
      <h1 className="text-center">Your Order has been confirmed!!</h1>
      <h3 className="text-center">It will be delievered soon !!</h3>

      <div className="container  my-3">
        <h1 className="text-3xl text-center">Order Summary</h1>

        <table className="table shadow-2xl table-bordered border-secondary">
          <thead>
            <tr>
              <th
                scope="col"
                className="bg-slate-200 text-black font-medium text-center"
              >
                Order Items
              </th>
              <th
                scope="col"
                className="bg-slate-200 text-black font-medium text-center"
              >
                OrderDetails & ShippingAddress
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-light text-black text-center">
                <ShowOrderProduct items={latestOrder?.orderItems} />
              </td>
              <td className="bg-light text-black">
                <ul>
                  <li>OrderId : {latestOrder?.orderId}</li>
                  <li>PaymentId : {latestOrder?.paymentId}</li>
                  <li>Payment Status : {latestOrder?.payStatus}</li>
                  <li>Name : {latestOrder?.userShipping?.fullName}</li>
                  <li>Phone : {latestOrder?.userShipping?.phoneNumber}</li>
                  <li>Pincode : {latestOrder?.userShipping?.pincode}</li>
                  <li>Address : {latestOrder?.userShipping?.address}</li>
                  <li>City : {latestOrder?.userShipping?.city}</li>
                  <li>State : {latestOrder?.userShipping?.state}</li>
                  <li>Country : {latestOrder?.userShipping?.country}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center my-5">
        <Link to="/">
          <button className="bg-gray-400 p-2 px-4  shadow-2xl mx-4 font-semibold hover-effect">
            Shopping
          </button>
        </Link>
        <Link to="/profile">
          <button className="bg-gray-400 p-2 px-4 shadow-2xl mx-4 font-semibold hover-effect">
            All Orders
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Orderconfirmation;
