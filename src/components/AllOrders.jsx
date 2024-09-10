import React, { useContext, useState, useEffect } from "react";
import AppContext from "../context/AppContext";
import ShowOrderProduct from "./ShowOrderProduct";
import { useNavigate } from "react-router-dom";
function AllOrders() {
  const { userOrder } = useContext(AppContext);
  console.log("userOrders profile ", userOrder);
  const navigate = useNavigate();

  return (
    <div className="bg-white  h-full min-w-screen max-w-screen min-h-screen p-2 text-black">
      {userOrder.length == 0 && (
        <div>
          <div className="flex flex-col justify-center items-center ">
            <img
              src="https://img.freepik.com/free-vector/woman-pushing-shopping-cart-white-background_1308-43517.jpg?t=st=1724010114~exp=1724013714~hmac=3301bcee70eb80c133c40026275ef091651b2db346b56e89c181ddaea91105fa&w=740"
              alt=""
              className="w-96 bg-contain "
            />
            <h1 className="text-3xl ">You Have no Orders!!</h1>
            <button
              className="text-2xl m-4 p-2  bg-slate-300 hover-effect"
              onClick={() => navigate("/")}
            >
              Shop Now
            </button>
          </div>
        </div>
      )}
      {userOrder.length > 0 && (
        <div>
          <div className="text-3xl text-center">All Orders</div>
          <>
            {userOrder?.map((order) => (
              <div key={order?._id}>
                <table className="table bg-slate-200 table-bordered border-secondary bg-dark">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="bg-light text-dark text-center"
                      >
                        Order Items
                      </th>
                      <th
                        scope="col"
                        className="bg-light text-dark text-center"
                      >
                        OrderDetails & ShippingAddress
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="bg-light text-dark text-center">
                        <ShowOrderProduct items={order?.orderItems} />
                      </td>
                      <td className="bg-light text-dark">
                        <ul>
                          <li>OrderId : {order?.orderId}</li>
                          <li>PaymentId : {order?.paymentId}</li>
                          <li>Payment Status : {order?.payStatus}</li>
                          <li>Name : {order?.userShipping?.fullName}</li>
                          <li>Phone : {order?.userShipping?.phoneNumber}</li>
                          <li>Pincode : {order?.userShipping?.pincode}</li>
                          <li>Address : {order?.userShipping?.address}</li>
                          <li>City : {order?.userShipping?.city}</li>
                          <li>State : {order?.userShipping?.state}</li>
                          <li>Country : {order?.userShipping?.country}</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </>
        </div>
      )}
    </div>
  );
}

export default AllOrders;
